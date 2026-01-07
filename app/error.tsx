'use client'
import { useEffect } from 'react'
import { EmptyTable } from './tasks/components/Empty-Table';
import { Ban } from 'lucide-react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error caught in error boundary:', error)
  }, [error])
    return (
    <div className="p-8 text-center w-full">
      <EmptyTable title='Error fetching data' description='Something went wrong' icon={Ban}/>
    </div>
  )
}
