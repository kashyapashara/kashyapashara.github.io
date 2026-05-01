import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Code2, Building2, Users, CheckCircle2, Clock, Circle, Star } from 'lucide-react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { slideUp, staggerContainer, staggerItem } from '../utils/animations'

const projectTypeLabels = {
  internal: 'Internal Project',
  client: 'Client Project',
  opensource: 'Open Source',
  personal: 'Personal Project'
}

const statusConfig = {
  completed: { icon: CheckCircle2, label: 'Completed', color: 'text-green-500', bg: 'bg-green-500/10' },
  'in-progress': { icon: Clock, label: 'In Progress', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  maintained: { icon: Circle, label: 'Actively Maintained', color: 'text-blue-500', bg: 'bg-blue-500/10' }
}

export default function ProjectDetail() {
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
          <p className="text-dark-600 dark:text-dark-400 mb-4">Failed to load project data</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const project = data.projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
        <div className="text-center">
          <p className="text-dark-600 dark:text-dark-400 mb-4">Project not found</p>
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
          {/* Project Header */}
          <motion.div variants={slideUp} className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-400 text-white rounded-full text-sm font-medium">
                  <Star size={12} />
                  Featured Project
                </span>
              )}
              {project.projectType && (
                <span className="px-3 py-1 bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 rounded-full text-sm font-medium">
                  {projectTypeLabels[project.projectType]}
                </span>
              )}
              {project.status && statusConfig[project.status] && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 ${statusConfig[project.status].bg} ${statusConfig[project.status].color} rounded-full text-sm font-medium`}>
                  {(() => {
                    const Icon = statusConfig[project.status].icon
                    return <Icon size={12} />
                  })()}
                  {statusConfig[project.status].label}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-4 mb-12">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Github size={18} />
                View Code
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div variants={staggerItem}>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                  About the Project
                </h2>
                <p className="text-dark-700 dark:text-dark-300 leading-relaxed whitespace-pre-line">
                  {project.longDescription || project.description}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div variants={staggerItem} className="space-y-6">
              {/* Company & Customer Info */}
              {(project.companyName || project.customer) && (
                <div className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                    Project Info
                  </h3>
                  <div className="space-y-4">
                    {project.companyName && (
                      <div>
                        <p className="text-xs text-dark-500 dark:text-dark-400 uppercase tracking-wider mb-1">
                          Company
                        </p>
                        <div className="flex items-center gap-2 text-dark-700 dark:text-dark-300">
                          <Building2 size={16} className="text-primary-500" />
                          {project.companyId ? (
                            <Link 
                              to={`/experience/${project.companyId}`}
                              className="hover:text-primary-500 transition-colors"
                            >
                              {project.companyName}
                            </Link>
                          ) : (
                            <span>{project.companyName}</span>
                          )}
                        </div>
                      </div>
                    )}
                    {project.customer && (
                      <div>
                        <p className="text-xs text-dark-500 dark:text-dark-400 uppercase tracking-wider mb-1">
                          Client / Customer
                        </p>
                        <div className="flex items-center gap-2 text-dark-700 dark:text-dark-300">
                          <Users size={16} className="text-primary-500" />
                          <span>{project.customer}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                  <Code2 size={20} className="text-primary-500" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {project.links && (
              <div className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                  Links
                </h3>
                <div className="space-y-3">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github size={18} />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
