import { PropsWithChildren, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { getRandomNumberBetween } from '../../general/helpers/number.helpers'
import { useDragging } from './use-dragging.hook'
import { useResizing } from './use-resizing.hook'
import s from './app-header.module.scss'

export function AppHeader(props: PropsWithChildren<{ title: string }>) {
   const [randomTop, setRandomTop] = useState(getRandomNumberBetween(10, 100))
   const [randomLeft, setRandomLeft] = useState(getRandomNumberBetween(100, 800))
   const appBorderRef = useRef<HTMLDivElement>(null)
   const appHeaderRef = useRef<HTMLDivElement>(null)
   const { horizontalDragInPx, verticalDragInPx } = useDragging({ elToDrag: appHeaderRef })
   const { canResize, horizontalResizeInPx, verticalResizeInPx } = useResizing({ elToResize: appBorderRef })

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
         <div ref={appHeaderRef}>
            <span className={s.title}>{props.title}</span>
         </div>

         {props.children}
      </div>
   )
}
