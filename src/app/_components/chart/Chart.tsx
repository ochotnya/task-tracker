'use client'

import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { TaskData, useAppContext } from '~/app/_components/AppContext'
import { Button } from '~/shadcn/ui/button'

const startOfDay = (date: DateTime) =>
  date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })

const endOfDay = (date: DateTime) =>
  date.set({ hour: 23, minute: 59, second: 59, millisecond: 999 })

type DateRange = {
  from: DateTime
  to: DateTime
}

const Chart = () => {
  const { appData: data } = useAppContext()
  const [date, setDate] = useState<DateRange>({
    from: startOfDay(DateTime.now()),
    to: endOfDay(DateTime.now()),
  })

  const changeDate = (days: number) => {
    setDate({
      from: date.from.plus({ days }),
      to: date.to.plus({ days }),
    })
  }

  return (
    <div className="w-full bg-gray-400 mt-4 p-2">
      <div className="w-full flex justify-center items-center p-4 gap-4">
        <Button className="bg-slate-500" onClick={() => changeDate(-1)}>
          Poprzedni dzień
        </Button>
        <div>
          Aktualny dzień:{' '}
          <span className="font-semibold">
            {date.from.toFormat('dd-MM-yyyy')}
          </span>
        </div>
        <Button className="bg-slate-500" onClick={() => changeDate(1)}>
          Następny dzień
        </Button>
      </div>
      {data.tasks.map((task, i) => (
        <Block
          task={task}
          key={i}
          selectedDateRange={date}
          tableWidthMs={date.to.diff(date.from).as('milliseconds')}
        />
      ))}
    </div>
  )
}

export default Chart

const Block = ({
  task,
  selectedDateRange,
  tableWidthMs,
}: {
  task: TaskData
  selectedDateRange: DateRange
  tableWidthMs: number
}) => {
  return (
    <div className="w-full flex gap-1 my-1">
      <div className="bg-slate-700 text-slate-300 w-[170px] p-2 rounded-sm">
        {task.name}
      </div>
      <div className="flex w-full relative">
        {task.activity.map((activity, i) => {
          let start = DateTime.fromISO(activity.start)
          let end = activity.end
            ? DateTime.fromISO(activity.end)
            : DateTime.now()

          const isToday =
            start < selectedDateRange.to && end > selectedDateRange.from

          if (!isToday) {
            return <></>
          }

          if (start < selectedDateRange.from) {
            start = selectedDateRange.from
          }

          if (end > selectedDateRange.to) {
            end = selectedDateRange.to
          }

          const duration = end.diff(start).as('milliseconds')
          const width = Math.floor((duration / tableWidthMs) * 100)

          const offset = Math.floor(
            (start.diff(selectedDateRange.from).as('milliseconds') /
              tableWidthMs) *
              100,
          )

          return (
            <div
              key={i}
              className={`border border-green-700 h-full top-0 absolute bg-green-700 rounded-sm`}
              style={{ width: `${width}%`, left: `${offset}%` }}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
