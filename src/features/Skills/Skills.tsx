import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { SkillCategory } from '../../types'
import { staggerContainer, staggerItem, slideUp } from '../../utils/animations'

interface SkillsProps {
  skillCategories: SkillCategory[]
}

export default function Skills({ skillCategories }: SkillsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-950">
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
              Skills & Expertise
            </h2>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Technologies and tools I use to build scalable, performant applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                variants={staggerItem}
                className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-6"
              >
                <h3 className="text-lg font-display font-semibold text-dark-900 dark:text-white mb-6">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-mono font-medium text-dark-700 dark:text-dark-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-dark-500 dark:text-dark-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + 0.2 }}
                          className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
