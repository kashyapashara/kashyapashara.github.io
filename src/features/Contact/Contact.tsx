import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, Send } from 'lucide-react'
import type { PersonalInfo } from '../../types'
import { staggerContainer, staggerItem, slideUp } from '../../utils/animations'

interface ContactProps {
  personal: PersonalInfo
}

export default function Contact({ personal }: ContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/kash9350',
      href: personal.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/kashyap-ashara',
      href: personal.linkedin,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white dark:bg-dark-950">
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
              Get In Touch
            </h2>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              I'm always open to discussing new projects, opportunities, or partnerships
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={staggerItem} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                  Let's work together
                </h3>
                <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                  Whether you have a question, want to collaborate, or just want to say hi,
                  I'll do my best to get back to you!
                </p>
              </div>

              <div className="space-y-4">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-dark-900 rounded-xl hover:bg-primary-600/10 dark:hover:bg-primary-400/20 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-dark-700 rounded-lg flex items-center justify-center group-hover:bg-primary-400 group-hover:text-white transition-colors">
                      <link.icon className="w-5 h-5 text-primary-500 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-dark-500 dark:text-dark-400">{link.label}</p>
                      <p className="font-medium text-dark-900 dark:text-white">{link.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form Placeholder */}
            <motion.div variants={staggerItem}>
              <div className="bg-gray-100 dark:bg-dark-900 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
                  Send a Message
                </h3>
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-400/20 dark:bg-primary-400/30 rounded-full flex items-center justify-center">
                    <Send className="w-8 h-8 text-primary-500" />
                  </div>
                  <p className="text-dark-600 dark:text-dark-400 mb-4">
                    Prefer to use your own email client?
                  </p>
                  <a
                    href={`mailto:${personal.email}?subject=Portfolio Contact`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Mail size={18} />
                    Send Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
