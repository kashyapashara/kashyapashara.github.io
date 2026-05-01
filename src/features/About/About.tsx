import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Layers, Zap, Users } from 'lucide-react'
import { staggerContainer, staggerItem, slideUp } from '../../utils/animations'

interface AboutProps {
  about: string
}

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with modern patterns',
  },
  {
    icon: Layers,
    title: 'Architecture',
    description: 'Designing robust frontend architecture and design systems',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing applications for speed and user experience',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Mentoring teams and fostering engineering excellence',
  },
]

export default function About({ about }: AboutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      className="py-20 bg-gray-100 dark:bg-dark-900"
    >
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
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div variants={staggerItem}>
              <p className="text-lg text-dark-700 dark:text-dark-300 leading-relaxed mb-8">
                {about}
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Microfrontends', 'Design Systems', 'Performance'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-primary-600/10 dark:bg-primary-400/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-mono font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-600/10 dark:bg-primary-400/20 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-dark-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-dark-600 dark:text-dark-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
