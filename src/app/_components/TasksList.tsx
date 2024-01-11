'use client'

import React from 'react'
import { useAppContext } from '~/app/_components/AppContext'
import TaskCard from '~/app/_components/TaskCard'

const TasksList = () => {
  const { appData: data } = useAppContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
      {data.tasks.map((task, i) => (
        <TaskCard data={task} key={i} />
      ))}
    </div>
  )
}

export default TasksList
