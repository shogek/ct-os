import { MouseEvent, useState } from 'react'
import { clsx } from 'clsx'
import s from './resizable-border.module.scss'

export function ResizableBorder(props: { children: JSX.Element }) {
   const [isHovered, setIsHovered] = useState(false)
   const [isClicked, setIsClicked] = useState(false)

   const handleMouseOver = (e: MouseEvent<HTMLElement>) => {
      // console.log('mouse over')
      setIsHovered(e.target === e.currentTarget)
   }

   const handleOnMouseDown = () => {
      // console.log('mouse down')
      setIsClicked(true)
   }

   const handleOnMouseUp = () => {
      // console.log('mouse up')
      setIsClicked(false)
   }

   return (
      <div
         className={clsx(
            s.resizableBorder,
            { [s._hover]: isHovered && !isClicked },
            { [s._resize]: isHovered && isClicked },
         )}
         onMouseOver={handleMouseOver}
         onMouseOut={() => setIsHovered(false)}
         onMouseDown={handleOnMouseDown}
         onMouseUp={handleOnMouseUp}
      >
         <div onMouseOver={() => setIsHovered(false)}>{props.children}</div>
      </div>
   )
}
