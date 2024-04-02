import { PropsWithChildren, useRef } from 'react'
import { useDragging } from './use-dragging.hook'
import s from './app-header.module.scss'

export function AppHeader(props: PropsWithChildren<{ title: string }>) {
   const elementToDragRef = useRef<HTMLDivElement>(null)
   const distanceDragged = useDragging({ elToDrag: elementToDragRef })

   return (
      <div className={s.appHeader} style={{ top: 100 + distanceDragged.top, left: 300 + distanceDragged.left }}>
         <div ref={elementToDragRef}>
            <span className={s.title}>{props.title}</span>
         </div>

         {props.children}
      </div>
   )
}
