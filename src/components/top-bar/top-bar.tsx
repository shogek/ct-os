import { memo, useRef, useState } from 'react'
import { getMillisecondsFrom, getMonthShortName } from '../../general/helpers/date-time.helpers'
import useEffectOnce from '../../general/hooks/useEffectOnce'
import s from './top-bar.module.scss'

function _TopBar() {
   const currentMinuteRef = useRef<number>(new Date().getMinutes())
   const [currentDate, setCurrentDate] = useState<string>(getFormattedDate(new Date()))

   useEffectOnce(() => {
      const intervalId = setInterval(recalculateCurrentDateIfMinuteChanged, getMillisecondsFrom(1, 'seconds'))

      return () => clearInterval(intervalId)
   })

   function recalculateCurrentDateIfMinuteChanged() {
      const currentTime = new Date()
      const currentMinutes = currentTime.getMinutes()
      if (currentMinutes === currentMinuteRef.current) {
         return
      }

      currentMinuteRef.current = currentMinutes
      setCurrentDate(getFormattedDate(currentTime))
   }

   /** `(new Date()) => "Sep 7 23:11"` */
   function getFormattedDate(date: Date): string {
      const monthName = getMonthShortName(date, navigator.language)
      const dayOfMonth = date.getDate()
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${monthName} ${dayOfMonth} ${hours}:${minutes}`
   }

   return <div className={s.wrapper}>{currentDate}</div>
}

export const TopBar = memo(_TopBar)
