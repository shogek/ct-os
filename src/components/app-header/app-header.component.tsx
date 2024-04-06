import { PropsWithChildren, useRef, useState } from 'react'
import { useSetAtom } from 'jotai'
import { clsx } from 'clsx'
import { getRandomNumberBetween } from '../../general/helpers/number.helpers'
import { activeApplicationsAtom } from '../../atoms/active-applications.atom'
import { useDragging } from './use-dragging.hook'
import { useResizing } from './use-resizing.hook'
import s from './app-header.module.scss'
import { DynamicIcon } from '../icons/icon'
import { ICON_TYPES } from '../icons/types'

type AppHeaderProps = {
   id: number
   title: string
}

export function AppHeader(props: PropsWithChildren<AppHeaderProps>) {
   const setActiveApplications = useSetAtom(activeApplicationsAtom)

   const [randomTop] = useState(getRandomNumberBetween(10, 100))
   const [randomLeft] = useState(getRandomNumberBetween(100, 800))
   const appBorderRef = useRef<HTMLDivElement>(null)
   const appHeaderRef = useRef<HTMLDivElement>(null)

   const { horizontalDragInPx, verticalDragInPx } = useDragging({ elToDrag: appHeaderRef })
   const { canResize, horizontalResizeInPx, verticalResizeInPx } = useResizing({ elToResize: appBorderRef })

   const handleCloseButtonClick = () => {
      setActiveApplications((activeApps) => activeApps.filter((x) => x.id !== props.id))
   }

   return (
      <div
         style={{
            minWidth: '250px',
            minHeight: '300px',
            width: 250 + horizontalResizeInPx + 'px',
            height: 300 + verticalResizeInPx + 'px',
            top: randomTop + verticalDragInPx,
            left: randomLeft + horizontalDragInPx,
            backgroundColor: 'red',
         }}
         ref={appBorderRef}
         className={clsx(s.appHeader, {
            [s._resized]: canResize,
         })}
      >
         <div className={s.header} ref={appHeaderRef}>
            <span className={s.title}>{props.title}</span>

            <button type="button" onClick={handleCloseButtonClick}>
               <DynamicIcon type={ICON_TYPES.CLOSE} iconProps={{ className: s.close }} />
            </button>
         </div>

         {props.children}
      </div>
   )
}
