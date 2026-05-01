import { usePortfolioData } from '../hooks/usePortfolioData'
import Header from '../features/Header/Header'
import Hero from '../features/Hero/Hero'
import About from '../features/About/About'
import Skills from '../features/Skills/Skills'
import Experience from '../features/Experience/Experience'
import Projects from '../features/Projects/Projects'
import Contact from '../features/Contact/Contact'

export default function Home() {
  const { data, loading, error } = usePortfolioData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
        <div className="animate-spin w-8 h-8 border-4 border-primary-400 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
        <div className="text-center">
          <p className="text-dark-600 dark:text-dark-400 mb-4">
            Failed to load portfolio data. Please try refreshing the page.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <Header personal={data.personal} />
      <main>
        <Hero personal={data.personal} />
        <About about={data.about} />
        <Skills skillCategories={data.skillCategories} />
        <Experience experience={data.experience} projects={data.projects} />
        <Projects projects={data.projects} />
        <Contact personal={data.personal} />
      </main>
      {/* Footer */}
      <footer className="py-8 bg-dark-900 dark:bg-dark-950 text-center">
        <p className="text-dark-400 dark:text-dark-500 text-sm">
          © {new Date().getFullYear()} {data.personal.name}. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  )
}
