import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react'
import type { PersonalInfo } from '../../types'
import { staggerContainer, staggerItem } from '../../utils/animations'

interface HeroProps {
  personal: PersonalInfo
}

export default function Hero({ personal }: HeroProps) {
  const [displayedName, setDisplayedName] = useState('')
  const name = personal.name
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= name.length) {
        setDisplayedName(name.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 150) // 150ms per character
    
    return () => clearInterval(interval)
  }, [name])

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-dark-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Tagline */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-600/10 dark:bg-primary-400/20 text-primary-600 dark:text-primary-400 text-sm font-medium">
              {personal.tagline}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-dark-900 dark:text-white">Hi, I'm </span>
            <span className="gradient-text">
              {displayedName}
              <motion.span
                className="inline-block w-0.5 h-[1em] bg-primary-500 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
              />
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="text-xl sm:text-2xl md:text-3xl text-dark-600 dark:text-dark-300 mb-8"
          >
            {personal.title}
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary flex items-center gap-2"
            >
              <Mail size={18} />
              Get In Touch
            </a>
            <a
              href="./resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-4"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-dark-900 text-dark-700 dark:text-dark-300 hover:bg-primary-400 hover:text-white dark:hover:bg-primary-400 dark:hover:text-dark-700 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-dark-900 text-dark-700 dark:text-dark-300 hover:bg-primary-400 hover:text-white dark:hover:bg-primary-400 dark:hover:text-dark-700 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-3 rounded-full bg-gray-100 dark:bg-dark-900 text-dark-700 dark:text-dark-300 hover:bg-primary-400 hover:text-white dark:hover:bg-primary-400 dark:hover:text-dark-700 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full text-dark-400 hover:text-primary-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  )
}
