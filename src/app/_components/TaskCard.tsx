import { DateTime } from 'luxon'
import React, { useEffect, useRef } from 'react'
import ActivitySegment from '~/app/_components/ActivitySegment'
import { Activity, JiraTask, useAppContext } from '~/app/_components/AppContext'
import { FaTrashAlt, FaPlay, FaStop } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shadcn/ui/card'
import { Button } from '~/shadcn/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/shadcn/ui/tooltip'

type Props = {
  data: JiraTask
}

const disabledButtonClassName = 'text-black bg-gray-500'

const TaskCard = ({ data }: Props) => {
  const { appData, saveData } = useAppContext()
  const ref = useRef<HTMLDivElement>(null)

  const activate = () => {
    const newTaskArray = appData.tasks.map((task) => {
      const activities = task.activity

      //enable selected task
      if (task.name === data.name) {
        const newActivity: Activity = { start: DateTime.now().toISO() }

        return {
          ...task,
          isActive: true,
          activity: [...activities, newActivity],
        }
      }

      //disable current task
      if (task.isActive) {
        const lastActivity = activities.pop()

        if (!lastActivity) {
          return task
        }

        lastActivity.end = DateTime.now().toISO()

        return {
          ...task,
          activity: [...activities, lastActivity],
          isActive: false,
        }
      }

      return task
    })

    saveData({ ...appData, tasks: newTaskArray })
  }

  const stopSelected = () => {
    const newTaskArray = appData.tasks.map((task) => {
      const activities = task.activity

      if (task.name === data.name) {
        const lastActivity = activities.pop()

        if (!lastActivity) {
          return task
        }

        lastActivity.end = DateTime.now().toISO()

        return {
          ...task,
          activity: [...activities, lastActivity],
          isActive: false,
        }
      }

      return task
    })

    saveData({ ...appData, tasks: newTaskArray })
  }

  const remove = () => {
    const tasks = appData.tasks.filter((task) => task.name !== data.name)

    saveData({ ...appData, tasks })
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [appData])

  return (
    <Card
      className={`w-[440px] h-[300px] border-none ${
        data.isActive ? 'bg-green-600' : 'bg-gray-400'
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle>{data.name}</CardTitle>
        <CardDescription className="text-black">Czas (suma): 7</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            disabled={data.isActive}
            className={`p-2 w-20 flex justify-center items-center ${
              data.isActive
                ? disabledButtonClassName
                : 'text-white bg-green-600'
            }`}
            onClick={activate}
          >
            <FaPlay />
          </Button>
          <Button
            disabled={!data.isActive}
            className={`p-2 w-20 flex justify-center items-center ${
              data.isActive ? 'bg-red-900 text-white' : disabledButtonClassName
            }`}
            onClick={stopSelected}
          >
            <FaStop />
          </Button>
          <Button
            className="flex w-20 p-2 justify-center items-center bg-red-700 text-white"
            onClick={remove}
          >
            <FaTrashAlt />
          </Button>
        </div>
        <div
          ref={ref}
          className="grid gap-2 grid-cols-6 mt-2 w-full max-h-[150px] overflow-hidden overflow-y-scroll"
        >
          {data.activity.map((activity, i) => (
            <ActivitySegment activity={activity} key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard
