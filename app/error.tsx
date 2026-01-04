'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error caught in error boundary:', error)
  }, [error])
    return (
    <div className="p-8 text-center">
      <h1>Something went wrong!</h1>
    </div>
  )
}
