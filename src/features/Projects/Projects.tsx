import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, ArrowRight, Star, Building2, Users, CheckCircle2, Clock, Circle } from 'lucide-react'
import type { Project as ProjectType } from '../../types'
import { staggerContainer, staggerItem, slideUp } from '../../utils/animations'

interface ProjectsProps {
  projects: ProjectType[]
}

const projectTypeLabels = {
  internal: 'Internal',
  client: 'Client Project',
  opensource: 'Open Source',
  personal: 'Personal'
}

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  'in-progress': { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  maintained: { icon: Circle, color: 'text-blue-500', bg: 'bg-blue-500/10' }
}

export default function Projects({ projects }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [filter, setFilter] = useState<'all' | 'featured' | 'client' | 'internal'>('all')

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true
    if (filter === 'featured') return p.featured
    if (filter === 'client') return p.projectType === 'client'
    if (filter === 'internal') return p.projectType === 'internal'
    return true
  })

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-dark-900">
      <div className="section-container py-0">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              A selection of projects I've worked on, from design systems to complex web applications
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { key: 'all', label: 'All Projects', icon: null },
              { key: 'featured', label: 'Featured', icon: Star },
              { key: 'client', label: 'Client Work', icon: Users },
              { key: 'internal', label: 'Internal', icon: Building2 }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filter === key
                    ? 'bg-primary-400 text-white dark:text-dark-800'
                    : 'bg-white dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-600'
                }`}
              >
                {Icon && <Icon size={16} />}
                {label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-400/20 to-primary-600/20 dark:from-primary-400/10 dark:to-primary-600/10 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-primary-400/20 dark:bg-primary-400/30 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-500">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-400 text-white dark:text-dark-800 rounded-full text-xs font-medium shadow-sm">
                        <Star size={10} />
                        Featured
                      </span>
                    )}
                    {project.status && statusConfig[project.status] && (
                      <span className={`inline-flex items-center gap-1 px-3 py-1 ${statusConfig[project.status].bg} ${statusConfig[project.status].color} rounded-full text-xs font-medium`}>
                        {(() => {
                          const Icon = statusConfig[project.status].icon
                          return <Icon size={10} />
                        })()}
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Company & Type */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {project.companyName && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 rounded text-xs font-medium">
                        <Building2 size={10} />
                        {project.companyName}
                      </span>
                    )}
                    {project.projectType && (
                      <span className="px-2.5 py-1 bg-primary-600/10 dark:bg-primary-400/20 text-primary-600 dark:text-primary-400 rounded text-xs font-medium">
                        {projectTypeLabels[project.projectType]}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-dark-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Customer */}
                  {project.customer && (
                    <p className="text-sm text-dark-500 dark:text-dark-400 mb-4 flex items-center gap-1">
                      <Users size={12} />
                      <span>Client: <span className="font-medium text-dark-700 dark:text-dark-300">{project.customer}</span></span>
                    </p>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 rounded-full text-xs font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-dark-500 dark:text-dark-500 rounded-full text-xs font-mono">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                          aria-label="View Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div variants={staggerItem} className="text-center mt-12">
            <a
              href="https://github.com/kash9350"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-900 dark:bg-white text-white dark:text-dark-900 rounded-full font-medium hover:bg-dark-800 dark:hover:bg-dark-100 transition-colors"
            >
              <Github size={18} />
              View More on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
