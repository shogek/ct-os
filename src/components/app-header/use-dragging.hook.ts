import { RefObject, useCallback, useEffect, useState } from 'react'

type Coords = {
   top: number
   left: number
}

export function useDragging(props: { elToDrag: RefObject<HTMLElement> }) {
   const [lastClick, setLastClick] = useState<Coords | null>(null)

   // const [delta, setDelta] = useState<Coords | null>(null)
   // const [isReleased, setIsReleased] = useState(true)
   const [startingClick, setStartingClick] = useState<Coords | null>(null)
   const [distanceDragged, setDistanceDragged] = useState<Coords>({ top: 0, left: 0 })

   const handleElementMouseDown = useCallback((e: MouseEvent) => {
      setLastClick({ top: e.clientY, left: e.clientX })
   }, [])

   const handleDocumentMouseUp = useCallback(() => {
      setLastClick(null)
      setStartingClick(null)
   }, [])

   const handleDocumentMouseMove = useCallback(
      (e: MouseEvent) => {
         if (!lastClick) {
            return
         }

         setLastClick({ top: e.clientY, left: e.clientX })
         setDistanceDragged((prev) => {
            return { top: prev.top + e.clientY - lastClick!.top, left: prev.left + e.clientX - lastClick!.left }
         })
      },
      [startingClick, props.elToDrag.current, lastClick],
   )

   useEffect(() => {
      if (!props.elToDrag.current) {
         return
      }

      props.elToDrag.current.addEventListener('mousedown', handleElementMouseDown)
      document.addEventListener('mouseup', handleDocumentMouseUp)

      return () => {
         props.elToDrag.current?.removeEventListener('mousedown', handleElementMouseDown)
         document.removeEventListener('mouseup', handleDocumentMouseUp)
      }
   }, [props.elToDrag])

   useEffect(() => {
      if (!lastClick) {
         document.removeEventListener('mousemove', handleDocumentMouseMove)
         return
      }

      document.addEventListener('mousemove', handleDocumentMouseMove)

      return () => {
         document.removeEventListener('mousemove', handleDocumentMouseMove)
      }
   }, [startingClick, handleDocumentMouseMove, lastClick])

   return distanceDragged
}
