'use client'

import React from 'react'
import { JiraTask, useAppContext } from '~/app/_components/AppContext'
import { Button } from '~/shadcn/ui/button'
import { Input } from '~/shadcn/ui/input'

const AddTask = () => {
  const { saveData, appData: data } = useAppContext()

  const createTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements[0] as HTMLInputElement
    const name = input.value

    input.value = ''

    const newTask: JiraTask = {
      name,
      activity: [],
      isActive: false,
    }

    saveData({ ...data, tasks: [...data.tasks, newTask] })
  }

  return (
    <form onSubmit={createTask} className="flex flex-col gap-2">
      <Input className="text-black p-2" placeholder="Nazwa zadania" size={40} />
      <Button type="submit" className="p-2 bg-blue-800 text-white">
        Dodaj zadanie
      </Button>
    </form>
  )
}

export default AddTask
