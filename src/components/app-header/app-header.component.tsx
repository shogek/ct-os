import { PropsWithChildren, useRef } from 'react'
import { clsx } from 'clsx'
import { useDragging } from './use-dragging.hook'
import { useResizing } from './use-resizing.hook'
import s from './app-header.module.scss'

export function AppHeader(props: PropsWithChildren<{ title: string }>) {
   const appBorderRef = useRef<HTMLDivElement>(null)
   const appHeaderRef = useRef<HTMLDivElement>(null)
   const distanceDragged = useDragging({ elToDrag: appHeaderRef })
   const { horizontally, vertically } = useResizing({ elToResize: appBorderRef })

   return (
      <div
         style={{
            minWidth: '250px',
            minHeight: '300px',
            width: 250 + horizontally + 'px',
            height: 300 + vertically + 'px',
            top: 100 + distanceDragged.top,
            left: 300 + distanceDragged.left,
         }}
         ref={appBorderRef}
         className={clsx(s.appHeader, {
            // [s._clicked]: isClicked,
            // [s._hovered]: isHovered,
            // [s._resized]: isClicked && isHovered,
         })}
      >
         <div ref={appHeaderRef}>
            <span className={s.title}>{props.title}</span>
         </div>

         {props.children}
      </div>
   )
}
