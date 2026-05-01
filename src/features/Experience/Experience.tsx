import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, Briefcase, FolderOpen } from 'lucide-react'
import type { Experience as ExperienceType, Project } from '../../types'
import { staggerContainer, staggerItem, slideUp } from '../../utils/animations'

interface ExperienceProps {
  experience: ExperienceType[]
  projects: Project[]
}

export default function Experience({ experience, projects }: ExperienceProps) {
  // Helper to get projects for an experience
  const getExperienceProjects = (exp: ExperienceType) => {
    if (!exp.projects || exp.projects.length === 0) return []
    return projects.filter(p => exp.projects?.includes(p.id))
  }
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-20 bg-white dark:bg-dark-950">
      <div className="section-container py-0">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Work Experience
            </h2>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              My professional journey building scalable applications and leading frontend teams
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600" />

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={staggerItem}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900 z-10" />

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-gray-100 dark:bg-dark-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-display font-bold text-dark-900 dark:text-white">
                            {exp.company}
                          </h3>
                          <p className="text-primary-500 font-medium">{exp.role}</p>
                          
                          {/* Employment Meta */}
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-dark-500 dark:text-dark-400">
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {exp.location}
                              </span>
                            )}
                            {exp.employmentType && (
                              <span className="flex items-center gap-1">
                                <Briefcase size={12} />
                                {exp.employmentType}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {exp.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-dark-700 dark:text-dark-300 mb-4">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white dark:bg-dark-900 text-dark-600 dark:text-dark-400 rounded-full text-xs font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-white dark:bg-dark-900 text-dark-500 dark:text-dark-500 rounded-full text-xs font-mono">
                            +{exp.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Achievements Preview */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-1 mb-4">
                          {exp.achievements.slice(0, 2).map((achievement, i) => (
                            <li
                              key={i}
                              className="text-sm text-dark-600 dark:text-dark-400 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Linked Projects */}
                      {(() => {
                        const linkedProjects = getExperienceProjects(exp)
                        if (linkedProjects.length === 0) return null
                        return (
                          <div className="mb-4 pt-4 border-t border-dark-200 dark:border-dark-700">
                            <p className="text-xs font-medium text-dark-500 dark:text-dark-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                              <FolderOpen size={12} />
                              Projects
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {linkedProjects.map(project => (
                                <Link
                                  key={project.id}
                                  to={`/project/${project.id}`}
                                  className="px-3 py-1.5 bg-primary-600/10 dark:bg-primary-400/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium hover:bg-primary-400/20 dark:hover:bg-primary-400/30 transition-colors"
                                >
                                  {project.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      })()}

                      {/* View Details Link */}
                      <Link
                        to={`/experience/${exp.id}`}
                        className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
