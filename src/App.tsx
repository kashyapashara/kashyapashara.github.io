import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ExperienceDetail from './pages/ExperienceDetail'
import { useScrollToTop } from './hooks/useScrollToTop'

function ScrollToTopWrapper() {
  useScrollToTop()
  return null
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTopWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
