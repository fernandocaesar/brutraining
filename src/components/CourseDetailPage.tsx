import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Course, VideoLesson, UserProgress } from '../types';
import { courseService } from '../services/courseService';
import { VideoPlayer } from './VideoPlayer';
import { sectionVariants, itemVariants, ChevronRightIcon } from '../constants';

export const CourseDetailPage: React.FC = () => {
  const { courseId, mode } = useParams<{ courseId: string; mode?: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<VideoLesson | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isPreviewMode = mode === 'preview';
  const userId = 'current-user'; // In production, get from auth context

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;
      
      try {
        const courseData = await courseService.getCourseById(courseId);
        if (courseData) {
          setCourse(courseData);
          
          // Set initial lesson
          const availableLessons = isPreviewMode 
            ? courseData.modules.flatMap(m => m.lessons.filter(l => l.isPreview))
            : courseData.modules.flatMap(m => m.lessons);
          
          if (availableLessons.length > 0) {
            setCurrentLesson(availableLessons[0]);
          }

          // Load user progress
          const progress = await courseService.getUserProgress(userId, courseId);
          setUserProgress(progress);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, isPreviewMode]);

  const handleProgressUpdate = async (progress: UserProgress) => {
    await courseService.updateUserProgress(progress);
    setUserProgress(prev => {
      const existingIndex = prev.findIndex(p => p.lessonId === progress.lessonId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = progress;
        return updated;
      }
      return [...prev, progress];
    });
  };

  const getLessonProgress = (lessonId: string) => {
    return userProgress.find(p => p.lessonId === lessonId);
  };

  const isLessonCompleted = (lessonId: string) => {
    const progress = getLessonProgress(lessonId);
    return progress?.completed || false;
  };

  const getModuleProgress = (moduleId: string) => {
    const module = course?.modules.find(m => m.id === moduleId);
    if (!module) return 0;

    const completedLessons = module.lessons.filter(lesson => 
      isLessonCompleted(lesson.id)
    ).length;

    return module.lessons.length > 0 ? (completedLessons / module.lessons.length) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-xl">Carregando curso...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return <Navigate to="/cursos" replace />;
  }

  const availableModules = isPreviewMode 
    ? course.modules.filter(m => m.lessons.some(l => l.isPreview))
    : course.modules;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="min-h-screen bg-slate-900 flex"
    >
      {/* Sidebar */}
      <motion.div
        variants={itemVariants}
        className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-slate-800 transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="text-white font-bold text-lg truncate">{course.title}</h2>
              {isPreviewMode && (
                <span className="text-amber-400 text-sm font-semibold">Modo Preview</span>
              )}
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-amber-400 transition-colors"
          >
            <ChevronRightIcon className={`w-6 h-6 transform transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Course Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {availableModules.map((module, moduleIndex) => (
            <div key={module.id} className="border-b border-slate-700">
              <div className="p-4">
                {sidebarOpen && (
                  <>
                    <h3 className="text-white font-semibold mb-2">{module.title}</h3>
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getModuleProgress(module.id)}%` }}
                      ></div>
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  {module.lessons
                    .filter(lesson => !isPreviewMode || lesson.isPreview)
                    .map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        currentLesson?.id === lesson.id
                          ? 'bg-amber-500 text-slate-900'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {isLessonCompleted(lesson.id) ? (
                          <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-5 h-5 mr-3 border-2 border-slate-400 rounded-full"></div>
                        )}
                        
                        {sidebarOpen ? (
                          <div className="flex-1">
                            <p className="font-medium text-sm">{lesson.title}</p>
                            <p className="text-xs opacity-75">
                              {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                            </p>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-slate-600 rounded flex items-center justify-center text-xs">
                            {lessonIndex + 1}
                          </div>
                        )}
                        
                        {lesson.isPreview && sidebarOpen && (
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full ml-2">
                            Grátis
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        {sidebarOpen && !isPreviewMode && (
          <div className="p-4 border-t border-slate-700">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">Progresso Geral</p>
              <div className="w-full bg-slate-600 rounded-full h-3 mb-2">
                <div
                  className="bg-amber-500 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${course.modules.length > 0 
                      ? course.modules.reduce((acc, module) => acc + getModuleProgress(module.id), 0) / course.modules.length 
                      : 0}%` 
                  }}
                ></div>
              </div>
              <p className="text-white text-sm font-semibold">
                {Math.round(course.modules.length > 0 
                  ? course.modules.reduce((acc, module) => acc + getModuleProgress(module.id), 0) / course.modules.length 
                  : 0)}% Concluído
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="flex-1 p-6">
          {currentLesson ? (
            <div>
              <VideoPlayer
                lesson={currentLesson}
                onProgress={handleProgressUpdate}
                userId={userId}
                courseId={courseId!}
              />
              
              <div className="mt-6 text-white">
                <h1 className="text-3xl font-bold mb-4">{currentLesson.title}</h1>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {currentLesson.description}
                </p>
                
                {isPreviewMode && !currentLesson.isPreview && (
                  <div className="mt-6 p-4 bg-amber-500/20 border border-amber-500 rounded-lg">
                    <p className="text-amber-400 font-semibold">
                      Esta aula está disponível apenas no curso completo.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Selecione uma aula para começar</h2>
                <p className="text-slate-400">
                  Escolha uma aula na barra lateral para iniciar seus estudos.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};