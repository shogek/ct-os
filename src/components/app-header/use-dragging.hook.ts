import { RefObject, useCallback, useEffect, useState } from 'react'

type Coords = {
   top: number
   left: number
}

type UseDraggingData = {
   /** Distance dragged vertically (in pixels) */
   verticalDragInPx: number
   /** Distance dragged horizontally (in pixels) */
   horizontalDragInPx: number
}

type UseDraggingProps = {
   elToDrag: RefObject<HTMLElement>
}

/** Returns distance in pixels how much a DOM node was dragged */
export function useDragging(props: UseDraggingProps): UseDraggingData {
   const [lastClick, setLastClick] = useState<Coords | null>(null)
   const [distanceDragged, setDistanceDragged] = useState<Coords>({ top: 0, left: 0 })

   const handleElementMouseDown = (e: MouseEvent) => {
      document.addEventListener('mouseup', handleDocumentMouseUp)

      setLastClick({ top: e.clientY, left: e.clientX })
   }

   const handleDocumentMouseUp = () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp)

      setLastClick(null)
   }

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

      return () => {
         props.elToDrag.current?.removeEventListener('mousedown', handleElementMouseDown)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
   }, [handleDocumentMouseMove, lastClick])

   return {
      verticalDragInPx: distanceDragged.top,
      horizontalDragInPx: distanceDragged.left,
   }
}
