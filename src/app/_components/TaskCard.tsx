import { DateTime, Duration } from 'luxon'
import React, { useCallback, useEffect, useRef } from 'react'
import ActivitySegment from '~/app/_components/ActivitySegment'
import { Activity, TaskData, useAppContext } from '~/app/_components/AppContext'
import { FaPlay, FaStop } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shadcn/ui/card'
import { Button } from '~/shadcn/ui/button'
import DeleteModal from '~/app/_components/DeleteModal'

type Props = {
  data: TaskData
}

const disabledButtonClassName = 'text-black bg-gray-500'

const TaskCard = ({ data }: Props) => {
  const { appData, saveData } = useAppContext()
  const ref = useRef<HTMLDivElement>(null)
  const timeSum = data.activity.reduce((prev, current) => {
    if (!current.end) {
      return prev
    }

    const duration = DateTime.fromISO(current.end)
      .diff(DateTime.fromISO(current.start))
      .as('milliseconds')

    return prev + duration
  }, 0)

  const activate = useCallback(() => {
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
  }, [appData, data.name, saveData])

  const stopSelected = useCallback(() => {
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
  }, [saveData, appData, data.name])

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
      className={` h-[300px] min-w-[320px] border-none ${
        data.isActive ? 'bg-green-600' : 'bg-gray-400'
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle>{data.name}</CardTitle>
        <CardDescription className="text-black">
          Czas (suma): {Duration.fromDurationLike(timeSum).toFormat('hh:mm')}{' '}
          [h]
        </CardDescription>
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
          <DeleteModal deleteHandler={remove} />
        </div>
        <div
          ref={ref}
          className="flex mt-2 flex-wrap gap-2 w-full max-h-[150px] overflow-hidden overflow-y-scroll"
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
