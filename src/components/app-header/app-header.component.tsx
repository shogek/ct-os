import { MouseEventHandler, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import s from './app-header.module.scss'

type Coords = {
   top: number
   left: number
}

export function AppHeader(props: PropsWithChildren<{ title: string }>) {
   const [clickCoords, setClickCoords] = useState<Coords | null>(null)
   const [position, setPosition] = useState<Coords>({ top: 100, left: 300 })

   const handleOnMouseMove = useCallback(
      (e: MouseEvent) => {
         if (!clickCoords) {
            return
         }

         // TODO: Document me better
         const topDifference = e.clientY - clickCoords.top
         const leftDifference = e.clientX - clickCoords.left

         setPosition({ top: position.top + topDifference, left: position.left + leftDifference })
      },
      [clickCoords],
   )

   const handleMouseUp = useCallback(() => {
      console.log('onMouseUp')
      setClickCoords(null)
   }, [])

   // TODO: Mouse up doesn't stop dragging
   useEffect(() => {
      if (!clickCoords) {
         document.removeEventListener('mousemove', handleOnMouseMove)
         document.removeEventListener('mouseup', handleMouseUp)
         return
      }

      document.addEventListener('mousemove', handleOnMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
   }, [clickCoords])

   return (
      <div className={s.appHeader} style={{ top: position.top, left: position.left }}>
         <div
            onMouseDown={(e: any) => {
               console.log('onMouseDown')
               console.log(e)
               setClickCoords({ top: e.clientY, left: e.clientX })
            }}
            onMouseUp={() => {
               console.log('onMouseUp')
               setClickCoords(null)
            }}
         >
            <span className={s.title}>{props.title}</span>
         </div>

         {props.children}
      </div>
   )
}
