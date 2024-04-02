import { RefObject, useCallback, useEffect, useState } from 'react'

type Coords = {
   top: number
   left: number
}

/** Returns distance in pixels how much a DOM node was dragged */
export function useDragging(props: { elToDrag: RefObject<HTMLElement> }) {
   const [lastClick, setLastClick] = useState<Coords | null>(null)
   const [distanceDragged, setDistanceDragged] = useState<Coords>({ top: 0, left: 0 })

   const handleElementMouseDown = useCallback((e: MouseEvent) => {
      setLastClick({ top: e.clientY, left: e.clientX })
   }, [])

   const handleDocumentMouseUp = useCallback(() => {
      setLastClick(null)
   }, [])

   const handleDocumentMouseMove = useCallback(
      (e: MouseEvent) => {
         if (!lastClick) {
            return
         }

         const distanceDraggedLeft = e.clientX - lastClick.left
         const distanceDraggedTop = e.clientY - lastClick.top

         setLastClick({ top: e.clientY, left: e.clientX })
         setDistanceDragged((prev) => ({
            top: prev.top + distanceDraggedTop,
            left: prev.left + distanceDraggedLeft,
         }))
      },
      [lastClick],
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
   }, [handleDocumentMouseUp, handleElementMouseDown, props.elToDrag])

   useEffect(() => {
      if (!lastClick) {
         document.removeEventListener('mousemove', handleDocumentMouseMove)
         return
      }

      document.addEventListener('mousemove', handleDocumentMouseMove)

      return () => {
         document.removeEventListener('mousemove', handleDocumentMouseMove)
      }
   }, [handleDocumentMouseMove, lastClick])

   return distanceDragged
}
