@@ .. @@
 export interface ClientResultImage {
   id: number;
   imageUrl: string;
   altText: string;
 }
+
+export interface VideoLesson {
+  id: string;
+  title: string;
+  description: string;
+  videoUrl: string;
+  thumbnailUrl: string;
+  duration: number; // in seconds
+  moduleId: string;
+  order: number;
+  isPreview: boolean;
+  createdAt: Date;
+  updatedAt: Date;
+}
+
+export interface VideoModule {
+  id: string;
+  title: string;
+  description: string;
+  order: number;
+  lessons: VideoLesson[];
+  isActive: boolean;
+  createdAt: Date;
+  updatedAt: Date;
+}
+
+export interface Course {
+  id: string;
+  title: string;
+  description: string;
+  thumbnailUrl: string;
+  price: number;
+  modules: VideoModule[];
+  isActive: boolean;
+  createdAt: Date;
+  updatedAt: Date;
+}
+
+export interface UserProgress {
+  userId: string;
+  courseId: string;
+  lessonId: string;
+  watchedDuration: number;
+  completed: boolean;
+  lastWatched: Date;
+}
+
+export interface VideoUploadProgress {
+  id: string;
+  fileName: string;
+  progress: number;
+  status: 'uploading' | 'processing' | 'completed' | 'error';
+  videoUrl?: string;
+  error?: string;
+}