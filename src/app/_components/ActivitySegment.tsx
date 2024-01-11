import { DateTime } from 'luxon'
import React from 'react'
import { Activity } from '~/app/_components/AppContext'
import { Badge } from '~/shadcn/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/shadcn/ui/tooltip'

type Props = {
  activity: Activity
}

const ActivitySegment = ({ activity }: Props) => {
  const start = DateTime.fromISO(activity.start)

  const duration = activity.end
    ? DateTime.fromISO(activity.end).diff(start).toFormat('hh:mm')
    : 'trwa'

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger>
        <Badge className={`${!activity.end && 'bg-yellow-400 text-black'}`}>
          {duration}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>Start: {start.toFormat('dd-MM-yyyy HH:mm')}</p>
        <p>
          Stop:{' '}
          {activity.end
            ? DateTime.fromISO(activity.end).toFormat('dd-MM-yyyy HH:mm')
            : '-'}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

export default ActivitySegment
