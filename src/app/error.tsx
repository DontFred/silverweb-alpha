'use client'
import Console from '@/comp/sw/app/Console'
import React, { useEffect } from 'react'

export default function Error({error, reset}: {
  error: Error
  reset: () => void
}) {
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
    <div>
      <Console error={["    "+ error.message]} custom={{command: "retry", output: [""], function: reset}} errorCode={500}/>
    </div>
  )
}

