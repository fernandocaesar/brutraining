import { BUNNY_CDN_CONFIG } from '../constants';

export interface BunnyUploadResponse {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

export class BunnyService {
  private static instance: BunnyService;
  private accessKey: string;
  private storageZoneName: string;
  private uploadUrl: string;
  private pullZoneUrl: string;

  private constructor() {
    this.accessKey = BUNNY_CDN_CONFIG.ACCESS_KEY;
    this.storageZoneName = BUNNY_CDN_CONFIG.STORAGE_ZONE_NAME;
    this.uploadUrl = BUNNY_CDN_CONFIG.UPLOAD_URL;
    this.pullZoneUrl = BUNNY_CDN_CONFIG.PULL_ZONE_URL;
  }

  public static getInstance(): BunnyService {
    if (!BunnyService.instance) {
      BunnyService.instance = new BunnyService();
    }
    return BunnyService.instance;
  }

  async uploadVideo(
    file: File,
    fileName: string,
    onProgress?: (progress: number) => void
  ): Promise<BunnyUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200 || xhr.status === 201) {
            const videoUrl = `${this.pullZoneUrl}/${fileName}`;
            resolve({
              success: true,
              videoUrl
            });
          } else {
            resolve({
              success: false,
              error: `Upload failed with status: ${xhr.status}`
            });
          }
        });

        xhr.addEventListener('error', () => {
          resolve({
            success: false,
            error: 'Network error during upload'
          });
        });

        xhr.open('PUT', `${this.uploadUrl}/${this.storageZoneName}/${fileName}`);
        xhr.setRequestHeader('AccessKey', this.accessKey);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.send(file);
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async deleteVideo(fileName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.uploadUrl}/${this.storageZoneName}/${fileName}`, {
        method: 'DELETE',
        headers: {
          'AccessKey': this.accessKey
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting video:', error);
      return false;
    }
  }

  getVideoUrl(fileName: string): string {
    return `${this.pullZoneUrl}/${fileName}`;
  }

  generateThumbnail(videoUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.currentTime = 5; // Capture at 5 seconds

      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnailUrl);
        }
      };

      video.src = videoUrl;
      video.load();
    });
  }
}

export const bunnyService = BunnyService.getInstance();