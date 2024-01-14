import { DateTime, Duration } from 'luxon'
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
    ? Duration.fromDurationLike(
        DateTime.fromISO(activity.end).diff(start).as('milliseconds'),
      ).toFormat('hh:mm:ss')
    : 'trwa'

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger>
        <Badge className={`${!activity.end && 'bg-yellow-400 text-black'}`}>
          {duration}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          <strong>Start:</strong> {start.toFormat('dd-MM-yyyy HH:mm')}
        </p>
        <p>
          <strong>Stop:</strong>{' '}
          {activity.end
            ? DateTime.fromISO(activity.end).toFormat('dd-MM-yyyy HH:mm')
            : '-'}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

export default ActivitySegment
