import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Code2, Award, MapPin, Briefcase, FolderOpen, ArrowUpRight } from 'lucide-react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { slideUp, staggerContainer, staggerItem } from '../utils/animations'

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, loading, error } = usePortfolioData()
  useScrollToTop()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
        <div className="animate-spin w-8 h-8 border-4 border-primary-400 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
        <div className="text-center">
          <p className="text-dark-600 dark:text-dark-400 mb-4">Failed to load experience data</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const experience = data.experience.find((e) => e.id === id)

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
        <div className="text-center">
          <p className="text-dark-600 dark:text-dark-400 mb-4">Experience not found</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-dark-950/90 backdrop-blur-md border-b border-dark-200 dark:border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <Link to="/" className="text-xl font-bold gradient-text">
              {data.personal.name}
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="section-container py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Experience Header */}
          <motion.div variants={slideUp} className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="flex items-center gap-1 text-primary-500 font-medium">
                <Calendar size={16} />
                {experience.duration}
              </span>
              {experience.employmentType && (
                <span className="px-3 py-1 bg-primary-600/10 dark:bg-primary-400/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium capitalize">
                  {experience.employmentType}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
              {experience.role}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-dark-600 dark:text-dark-400">
              <span className="text-xl text-primary-500 font-medium">{experience.company}</span>
              {experience.location && (
                <span className="flex items-center gap-1 text-sm">
                  <MapPin size={14} />
                  {experience.location}
                </span>
              )}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div variants={staggerItem}>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                  Role Overview
                </h2>
                <p className="text-dark-700 dark:text-dark-300 leading-relaxed">
                  {experience.longDescription || experience.description}
                </p>
              </motion.div>

              {/* Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <motion.div variants={staggerItem}>
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award size={24} className="text-primary-500" />
                    Key Achievements
                  </h2>
                  <ul className="space-y-3">
                    {experience.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-dark-700 dark:text-dark-300"
                      >
                        <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Projects at this Company */}
              {experience.projects && experience.projects.length > 0 && (
                <motion.div variants={staggerItem}>
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6 flex items-center gap-2">
                    <FolderOpen size={24} className="text-primary-500" />
                    Projects at {experience.company}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {experience.projects.map((projectId) => {
                      const project = data.projects.find((p) => p.id === projectId)
                      if (!project) return null
                      return (
                        <Link
                          key={projectId}
                          to={`/project/${projectId}`}
                          className="group bg-dark-50 dark:bg-dark-800 rounded-xl p-4 hover:bg-primary-600/10 dark:hover:bg-primary-400/20 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors">
                              {project.title}
                            </h3>
                            <ArrowUpRight size={16} className="text-dark-400 group-hover:text-primary-500 transition-colors" />
                          </div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 line-clamp-2 mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 bg-white dark:bg-dark-700 text-dark-600 dark:text-dark-400 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.customer && (
                            <p className="mt-3 text-xs text-dark-500 dark:text-dark-500">
                              Client: {project.customer}
                            </p>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div variants={staggerItem} className="space-y-8">
              {/* Technologies */}
              <div className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                  <Code2 size={20} className="text-primary-500" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                  Employment Details
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-dark-500 dark:text-dark-400 mb-1">Company</p>
                    <p className="text-dark-900 dark:text-white font-medium">
                      {experience.company}
                    </p>
                  </div>
                  <div>
                    <p className="text-dark-500 dark:text-dark-400 mb-1">Role</p>
                    <p className="text-dark-900 dark:text-white font-medium">
                      {experience.role}
                    </p>
                  </div>
                  {experience.employmentType && (
                    <div>
                      <p className="text-dark-500 dark:text-dark-400 mb-1">Employment Type</p>
                      <div className="flex items-center gap-2 text-dark-700 dark:text-dark-300">
                        <Briefcase size={14} className="text-primary-500" />
                        <span className="capitalize">{experience.employmentType}</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-dark-500 dark:text-dark-400 mb-1">Duration</p>
                    <p className="text-dark-900 dark:text-white font-medium">
                      {experience.duration}
                    </p>
                  </div>
                  {experience.location && (
                    <div>
                      <p className="text-dark-500 dark:text-dark-400 mb-1">Location</p>
                      <div className="flex items-center gap-2 text-dark-700 dark:text-dark-300">
                        <MapPin size={14} className="text-primary-500" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
