import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
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
                    <div key={skill.id} className={skill.trending ? 'relative' : ''}>
                      <div className="flex justify-between mb-2">
                        <span className={`text-sm font-mono font-medium flex items-center gap-2 ${
                          skill.trending 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-dark-700 dark:text-dark-300'
                        }`}>
                          {skill.name}
                          {skill.trending && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5, duration: 0.3 }}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg"
                            >
                              <Sparkles size={10} />
                              Rising
                            </motion.span>
                          )}
                        </span>
                        <span className={`text-sm ${
                          skill.trending 
                            ? 'text-primary-600 dark:text-primary-400 font-bold' 
                            : 'text-dark-500 dark:text-dark-400'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + 0.2 }}
                          className={`h-full rounded-full relative ${
                            skill.trending
                              ? 'bg-gradient-to-r from-primary-400 via-purple-500 to-primary-600'
                              : 'bg-gradient-to-r from-primary-400 to-primary-500'
                          }`}
                        >
                          {skill.trending && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            />
                          )}
                        </motion.div>
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
