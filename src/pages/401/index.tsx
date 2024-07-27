import Link from 'next/link'
import React from 'react'

const Index = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <img src="/401.jpg" alt="401" 
      className='w-96 h-full object-contain'
      />
      <h1 className='text-2xl font-bold'>401 | Unauthorized</h1>
      <Link href='/'>
        <span className='text-blue-500'>Back to Home</span>
      </Link>
    </div>
  )
}

export default Index