"use client"
import { Progress } from "@/components/ui/progress"

import React from 'react'

const QuestionLoader = ({
  timeLimit,
  className = ""
}: {
  timeLimit: number
  className?: string
}) => {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  } , [])
  return (
    <div className={className}>
      <Progress value={value/timeLimit * 100} color="BLUE" />
    </div>
  )
}

export default QuestionLoader
