'use client'

import React, { useState } from 'react'
import { useAppContext } from '~/app/_components/AppContext'
import TaskCard from '~/app/_components/TaskCard'

const TasksList = () => {
  const { appData: data } = useAppContext()

  return (
    <div className="grid grid-cols-3 gap-4 border w-full px-4">
      {data.tasks.map((task, i) => (
        <TaskCard data={task} key={i} />
      ))}
    </div>
  )
}

export default TasksList
