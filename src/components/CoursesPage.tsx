import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { courseService } from '../services/courseService';
import { sectionVariants, itemVariantsStagger, ChevronRightIcon } from '../constants';

const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => {
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const previewLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.isPreview).length, 0
  );

  return (
    <motion.div
      variants={itemVariantsStagger(index)}
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative">
        <img 
          src={course.thumbnailUrl} 
          alt={course.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full font-bold">
          R$ {course.price}
        </div>
        {previewLessons > 0 && (
          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {previewLessons} aulas grátis
          </div>
        )}
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-800">{course.title}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">{course.description}</p>
        
        <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
          <span>{course.modules.length} módulos</span>
          <span>{totalLessons} aulas</span>
          <span>Acesso vitalício</span>
        </div>

        <div className="space-y-3">
          <Link
            to={`/curso/${course.id}`}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-full text-center hover:bg-indigo-700 transition-colors duration-300 inline-flex items-center justify-center group"
          >
            Ver Curso Completo
            <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          
          {previewLessons > 0 && (
            <Link
              to={`/curso/${course.id}/preview`}
              className="w-full bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-full text-center hover:bg-amber-400 transition-colors duration-300 inline-flex items-center justify-center"
            >
              Assistir Aulas Grátis
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await courseService.getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Carregando cursos...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="py-12 md:py-20 bg-slate-100 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-800">
            Cursos de Transformação
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubra nossa metodologia exclusiva através de cursos completos, 
            com aulas práticas e acompanhamento personalizado para sua jornada de transformação.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-slate-600 mb-4">
              Nenhum curso disponível no momento
            </h2>
            <p className="text-slate-500">
              Novos cursos serão lançados em breve. Fique atenta às novidades!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          variants={itemVariantsStagger(courses.length)}
          className="text-center mt-16 p-8 bg-indigo-800 rounded-xl text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-xl mb-6">
            Entre em contato conosco para uma mentoria personalizada
          </p>
          <Link
            to="/anamnese"
            className="bg-amber-500 text-slate-900 font-bold py-4 px-8 rounded-full text-lg uppercase shadow-lg hover:bg-amber-400 transition-colors duration-300 inline-flex items-center group"
          >
            Avaliação Personalizada
            <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};