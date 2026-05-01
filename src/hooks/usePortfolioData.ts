import { useEffect, useState } from 'react'
import type { PortfolioData } from '../types'
import portfolioData from '../data.json'

interface UsePortfolioDataReturn {
  data: PortfolioData | null
  loading: boolean
  error: Error | null
}

export function usePortfolioData(): UsePortfolioDataReturn {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate a small delay for loading state (optional - remove for instant load)
    const timer = setTimeout(() => {
      try {
        setData(portfolioData as PortfolioData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load portfolio data'))
      } finally {
        setLoading(false)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { data, loading, error }
}
