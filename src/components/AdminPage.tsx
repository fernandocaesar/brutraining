import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Course, VideoModule, VideoLesson, VideoUploadProgress } from '../types';
import { courseService } from '../services/courseService';
import { bunnyService } from '../services/bunnyService';
import { sectionVariants, itemVariants } from '../constants';

export const AdminPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'modules' | 'lessons' | 'upload'>('courses');
  const [loading, setLoading] = useState(true);

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    price: 0,
    isActive: true
  });

  const [moduleForm, setModuleForm] = useState({
    title: '',
    description: '',
    order: 1,
    isActive: true
  });

  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    moduleId: '',
    order: 1,
    isPreview: false,
    videoFile: null as File | null,
    thumbnailUrl: ''
  });

  const [uploadProgress, setUploadProgress] = useState<VideoUploadProgress[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const coursesData = await courseService.getCourses();
      setCourses(coursesData);
      if (coursesData.length > 0 && !selectedCourse) {
        setSelectedCourse(coursesData[0]);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCourse = await courseService.createCourse({
        ...courseForm,
        modules: []
      });
      setCourses(prev => [...prev, newCourse]);
      setCourseForm({
        title: '',
        description: '',
        thumbnailUrl: '',
        price: 0,
        isActive: true
      });
      alert('Curso criado com sucesso!');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Erro ao criar curso');
    }
  };

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      const newModule = await courseService.addModule(selectedCourse.id, {
        ...moduleForm,
        lessons: []
      });
      
      if (newModule) {
        await loadCourses();
        setModuleForm({
          title: '',
          description: '',
          order: 1,
          isActive: true
        });
        alert('Módulo criado com sucesso!');
      }
    } catch (error) {
      console.error('Error creating module:', error);
      alert('Erro ao criar módulo');
    }
  };

  const handleVideoUpload = async (file: File, lessonTitle: string) => {
    const uploadId = Date.now().toString();
    const fileName = `${Date.now()}-${file.name}`;

    // Add to upload progress
    const newUpload: VideoUploadProgress = {
      id: uploadId,
      fileName: lessonTitle,
      progress: 0,
      status: 'uploading'
    };
    setUploadProgress(prev => [...prev, newUpload]);

    try {
      const result = await bunnyService.uploadVideo(
        file,
        fileName,
        (progress) => {
          setUploadProgress(prev => prev.map(upload => 
            upload.id === uploadId 
              ? { ...upload, progress }
              : upload
          ));
        }
      );

      if (result.success && result.videoUrl) {
        setUploadProgress(prev => prev.map(upload => 
          upload.id === uploadId 
            ? { ...upload, status: 'completed', videoUrl: result.videoUrl }
            : upload
        ));
        return result.videoUrl;
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadProgress(prev => prev.map(upload => 
        upload.id === uploadId 
          ? { ...upload, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
          : upload
      ));
      throw error;
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !lessonForm.videoFile) return;

    try {
      // Upload video first
      const videoUrl = await handleVideoUpload(lessonForm.videoFile, lessonForm.title);
      
      // Generate thumbnail if not provided
      let thumbnailUrl = lessonForm.thumbnailUrl;
      if (!thumbnailUrl) {
        thumbnailUrl = await bunnyService.generateThumbnail(videoUrl);
      }

      // Create lesson
      const newLesson = await courseService.addLesson(
        selectedCourse.id,
        lessonForm.moduleId,
        {
          title: lessonForm.title,
          description: lessonForm.description,
          videoUrl,
          thumbnailUrl,
          duration: 0, // Will be updated when video metadata is available
          moduleId: lessonForm.moduleId,
          order: lessonForm.order,
          isPreview: lessonForm.isPreview
        }
      );

      if (newLesson) {
        await loadCourses();
        setLessonForm({
          title: '',
          description: '',
          moduleId: '',
          order: 1,
          isPreview: false,
          videoFile: null,
          thumbnailUrl: ''
        });
        alert('Aula criada com sucesso!');
      }
    } catch (error) {
      console.error('Error creating lesson:', error);
      alert('Erro ao criar aula');
    }
  };

  const removeUploadProgress = (id: string) => {
    setUploadProgress(prev => prev.filter(upload => upload.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="min-h-screen bg-slate-100 py-8"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Painel Administrativo</h1>
          <p className="text-slate-600">Gerencie cursos, módulos e aulas da plataforma</p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex space-x-4 border-b border-slate-300">
            {[
              { key: 'courses', label: 'Cursos' },
              { key: 'modules', label: 'Módulos' },
              { key: 'lessons', label: 'Aulas' },
              { key: 'upload', label: 'Uploads' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 font-semibold transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Course Selection */}
        <motion.div variants={itemVariants} className="mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Curso Selecionado:
          </label>
          <select
            value={selectedCourse?.id || ''}
            onChange={(e) => {
              const course = courses.find(c => c.id === e.target.value);
              setSelectedCourse(course || null);
            }}
            className="w-full max-w-md p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Selecione um curso</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={itemVariants}>
          {activeTab === 'courses' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-6">Gerenciar Cursos</h2>
              
              {/* Create Course Form */}
              <form onSubmit={handleCreateCourse} className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Título do Curso
                    </label>
                    <input
                      type="text"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL da Thumbnail
                  </label>
                  <input
                    type="url"
                    value={courseForm.thumbnailUrl}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Criar Curso
                </button>
              </form>

              {/* Courses List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">Cursos Existentes</h3>
                {courses.map(course => (
                  <div key={course.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{course.title}</h4>
                        <p className="text-slate-600">{course.description}</p>
                        <p className="text-sm text-slate-500 mt-2">
                          R$ {course.price} • {course.modules.length} módulos
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                        >
                          Selecionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'modules' && selectedCourse && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-6">
                Módulos - {selectedCourse.title}
              </h2>
              
              {/* Create Module Form */}
              <form onSubmit={handleCreateModule} className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Título do Módulo
                    </label>
                    <input
                      type="text"
                      value={moduleForm.title}
                      onChange={(e) => setModuleForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ordem
                    </label>
                    <input
                      type="number"
                      value={moduleForm.order}
                      onChange={(e) => setModuleForm(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={moduleForm.description}
                    onChange={(e) => setModuleForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Criar Módulo
                </button>
              </form>

              {/* Modules List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">Módulos Existentes</h3>
                {selectedCourse.modules.map(module => (
                  <div key={module.id} className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold text-lg">{module.title}</h4>
                    <p className="text-slate-600">{module.description}</p>
                    <p className="text-sm text-slate-500 mt-2">
                      {module.lessons.length} aulas • Ordem: {module.order}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'lessons' && selectedCourse && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-6">
                Aulas - {selectedCourse.title}
              </h2>
              
              {/* Create Lesson Form */}
              <form onSubmit={handleCreateLesson} className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Título da Aula
                    </label>
                    <input
                      type="text"
                      value={lessonForm.title}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Módulo
                    </label>
                    <select
                      value={lessonForm.moduleId}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, moduleId: e.target.value }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    >
                      <option value="">Selecione um módulo</option>
                      {selectedCourse.modules.map(module => (
                        <option key={module.id} value={module.id}>
                          {module.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={lessonForm.description}
                    onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Arquivo de Vídeo
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setLessonForm(prev => ({ 
                        ...prev, 
                        videoFile: e.target.files?.[0] || null 
                      }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ordem
                    </label>
                    <input
                      type="number"
                      value={lessonForm.order}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lessonForm.isPreview}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, isPreview: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Aula gratuita (preview)
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!lessonForm.videoFile}
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-slate-400"
                >
                  Criar Aula
                </button>
              </form>

              {/* Lessons List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800">Aulas Existentes</h3>
                {selectedCourse.modules.map(module => (
                  <div key={module.id} className="border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3">{module.title}</h4>
                    {module.lessons.length === 0 ? (
                      <p className="text-slate-500 italic">Nenhuma aula neste módulo</p>
                    ) : (
                      <div className="space-y-2">
                        {module.lessons.map(lesson => (
                          <div key={lesson.id} className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium">{lesson.title}</h5>
                                <p className="text-sm text-slate-600">{lesson.description}</p>
                                <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                                  <span>Ordem: {lesson.order}</span>
                                  <span>{Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}</span>
                                  {lesson.isPreview && (
                                    <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                                      Grátis
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-6">Status de Uploads</h2>
              
              {uploadProgress.length === 0 ? (
                <p className="text-slate-500 text-center py-8">
                  Nenhum upload em andamento
                </p>
              ) : (
                <div className="space-y-4">
                  {uploadProgress.map(upload => (
                    <div key={upload.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{upload.fileName}</h4>
                        <button
                          onClick={() => removeUploadProgress(upload.id)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            upload.status === 'completed' ? 'bg-green-500' :
                            upload.status === 'error' ? 'bg-red-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${upload.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className={`font-medium ${
                          upload.status === 'completed' ? 'text-green-600' :
                          upload.status === 'error' ? 'text-red-600' : 'text-indigo-600'
                        }`}>
                          {upload.status === 'uploading' && 'Enviando...'}
                          {upload.status === 'processing' && 'Processando...'}
                          {upload.status === 'completed' && 'Concluído'}
                          {upload.status === 'error' && 'Erro'}
                        </span>
                        <span className="text-slate-500">
                          {Math.round(upload.progress)}%
                        </span>
                      </div>
                      
                      {upload.error && (
                        <p className="text-red-600 text-sm mt-2">{upload.error}</p>
                      )}
                      
                      {upload.videoUrl && (
                        <p className="text-green-600 text-sm mt-2">
                          Vídeo disponível em: {upload.videoUrl}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};