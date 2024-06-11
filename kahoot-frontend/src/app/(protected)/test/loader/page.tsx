import QuestionLoader from '@/components/QuestionLoader'
import React from 'react'

const page = () => {
  return (
    <QuestionLoader timeLimit={5} className='fixed -inset-1 z-50'/>
  )
}

export default page
