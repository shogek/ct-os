import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import s from './app-header.module.scss'

export function AppHeader(props: PropsWithChildren<{ title: string }>) {
   const [isClicked, setIsClicked] = useState(false)
   const [position, setPosition] = useState({ top: '100px', left: '100px' })

   const handleOnMouseMove = useCallback((e: MouseEvent) => {
      console.log(e)
      setPosition({ top: e.clientY + 'px', left: e.clientX + 'px' })
   }, [])

   useEffect(() => {
      if (!isClicked) {
         document.removeEventListener('mousemove', handleOnMouseMove)
         return
      }

      document.addEventListener('mousemove', handleOnMouseMove)
   }, [isClicked])

   return (
      <div className={s.appHeader} style={{ top: position.top, left: position.left }}>
         <div
            onMouseDown={() => {
               console.log('onMouseDown')
               setIsClicked(true)
            }}
            onMouseUp={() => {
               console.log('onMouseUp')
               setIsClicked(false)
            }}
         >
            <span className={s.title}>{props.title}</span>
         </div>

         {props.children}
      </div>
   )
}
