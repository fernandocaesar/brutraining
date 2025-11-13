import { Course, VideoModule, VideoLesson, UserProgress } from '../types';

// Mock data - In production, this would connect to your backend API
class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Método brunaTreinamente - Completo',
      description: 'Transforme seu corpo e mente com nossa metodologia exclusiva',
      thumbnailUrl: 'https://ubie.com.br/image/curso-completo.png',
      price: 497,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      modules: [
        {
          id: 'mod1',
          title: 'Módulo 1: Fundamentos da Transformação',
          description: 'Entenda os pilares do emagrecimento definitivo',
          order: 1,
          isActive: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          lessons: [
            {
              id: 'lesson1',
              title: 'Bem-vinda ao Método brunaTreinamente',
              description: 'Introdução completa ao método e como ele vai transformar sua vida',
              videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
              thumbnailUrl: 'https://ubie.com.br/image/aula1-thumb.png',
              duration: 1200,
              moduleId: 'mod1',
              order: 1,
              isPreview: true,
              createdAt: new Date('2024-01-01'),
              updatedAt: new Date('2024-01-01')
            },
            {
              id: 'lesson2',
              title: 'Mindset para o Emagrecimento',
              description: 'Como reprogramar sua mente para o sucesso',
              videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
              thumbnailUrl: 'https://ubie.com.br/image/aula2-thumb.png',
              duration: 1800,
              moduleId: 'mod1',
              order: 2,
              isPreview: false,
              createdAt: new Date('2024-01-01'),
              updatedAt: new Date('2024-01-01')
            }
          ]
        },
        {
          id: 'mod2',
          title: 'Módulo 2: Nutrição Inteligente',
          description: 'Aprenda a se alimentar de forma estratégica',
          order: 2,
          isActive: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          lessons: [
            {
              id: 'lesson3',
              title: 'Planejamento Alimentar Personalizado',
              description: 'Como criar seu plano alimentar ideal',
              videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
              thumbnailUrl: 'https://ubie.com.br/image/aula3-thumb.png',
              duration: 2100,
              moduleId: 'mod2',
              order: 1,
              isPreview: false,
              createdAt: new Date('2024-01-01'),
              updatedAt: new Date('2024-01-01')
            }
          ]
        }
      ]
    }
  ];

  private userProgress: UserProgress[] = [];

  async getCourses(): Promise<Course[]> {
    return this.courses.filter(course => course.isActive);
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.courses.find(course => course.id === id) || null;
  }

  async createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    const courseIndex = this.courses.findIndex(course => course.id === id);
    if (courseIndex === -1) return null;

    this.courses[courseIndex] = {
      ...this.courses[courseIndex],
      ...updates,
      updatedAt: new Date()
    };
    return this.courses[courseIndex];
  }

  async deleteCourse(id: string): Promise<boolean> {
    const courseIndex = this.courses.findIndex(course => course.id === id);
    if (courseIndex === -1) return false;

    this.courses.splice(courseIndex, 1);
    return true;
  }

  async addModule(courseId: string, module: Omit<VideoModule, 'id' | 'createdAt' | 'updatedAt'>): Promise<VideoModule | null> {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return null;

    const newModule: VideoModule = {
      ...module,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    course.modules.push(newModule);
    course.updatedAt = new Date();
    return newModule;
  }

  async addLesson(courseId: string, moduleId: string, lesson: Omit<VideoLesson, 'id' | 'createdAt' | 'updatedAt'>): Promise<VideoLesson | null> {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return null;

    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return null;

    const newLesson: VideoLesson = {
      ...lesson,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    module.lessons.push(newLesson);
    course.updatedAt = new Date();
    return newLesson;
  }

  async updateUserProgress(progress: UserProgress): Promise<void> {
    const existingIndex = this.userProgress.findIndex(
      p => p.userId === progress.userId && p.lessonId === progress.lessonId
    );

    if (existingIndex >= 0) {
      this.userProgress[existingIndex] = progress;
    } else {
      this.userProgress.push(progress);
    }
  }

  async getUserProgress(userId: string, courseId: string): Promise<UserProgress[]> {
    return this.userProgress.filter(
      p => p.userId === userId && p.courseId === courseId
    );
  }
}

export const courseService = new CourseService();