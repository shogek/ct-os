import { RefObject, useEffect, useRef, useState } from 'react'

type Coords = {
   clientX: number
   clientY: number
}

type UseResizingData = {
   /** Distance resized vertically (in pixels) */
   verticalResizeInPx: number
   /** Distance resized horizontally (in pixels) */
   horizontalResizeInPx: number
   /** Indicates if the cursor is hovering over the border */
   canResize: boolean
}

type UseResizingProps = {
   elToResize: RefObject<HTMLElement>
}

/** Returns distance in pixels how much a DOM node was resized vertically and horizontally */
export function useResizing(props: UseResizingProps): UseResizingData {
   const [isClicked, setIsClicked] = useState(false)
   const [isHovered, setIsHovered] = useState(false)
   const [distanceResized, setDistanceResized] = useState({ horizontally: 0, vertically: 0 })
   const lastClickRef = useRef<Coords>({ clientX: 0, clientY: 0 })

   const handleBorderMouseDown = (e: MouseEvent) => {
      if (!props.elToResize.current || !e.target || !(e.target instanceof Element)) {
         return
      }

      // Determine if clicked on the border element or a child inside it
      if (e.target.contains(props.elToResize.current)) {
         setIsClicked(true)
         lastClickRef.current = { clientX: e.clientX, clientY: e.clientY }
      } else {
         setIsClicked(false)
      }
   }

   const handleBorderMouseOver = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Element)) {
         return
      }

      if (e.target.contains(props.elToResize.current)) {
         setIsHovered(true)
      } else {
         setIsHovered(false)
      }
   }

   const handleDocumentMouseMove = (e: MouseEvent) => {
      const movedHorizontally = e.clientX - lastClickRef.current.clientX
      const movedVertically = e.clientY - lastClickRef.current.clientY

      setDistanceResized((prev) => ({
         horizontally: prev.horizontally + movedHorizontally,
         vertically: prev.vertically + movedVertically,
      }))

      lastClickRef.current = { clientX: e.clientX, clientY: e.clientY }
   }

   const handleDocumentMouseUp = () => {
      setIsClicked(false)
   }

   useEffect(() => {
      if (!isClicked) {
         document.removeEventListener('mouseup', handleDocumentMouseUp)
         document.removeEventListener('mousemove', handleDocumentMouseMove)
         return
      }

      document.addEventListener('mouseup', handleDocumentMouseUp)
      document.addEventListener('mousemove', handleDocumentMouseMove)

      return () => {
         document.removeEventListener('mouseup', handleDocumentMouseUp)
         document.removeEventListener('mousemove', handleDocumentMouseMove)
      }
   }, [isClicked])

   useEffect(() => {
      if (!props.elToResize.current) {
         return
      }

      props.elToResize.current.addEventListener('mousedown', handleBorderMouseDown)
      props.elToResize.current.addEventListener('mouseover', handleBorderMouseOver)

      return () => {
         props.elToResize.current?.removeEventListener('mousedown', handleBorderMouseDown)
         props.elToResize.current?.removeEventListener('mouseover', handleBorderMouseOver)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [props.elToResize])

   return {
      canResize: isHovered,
      verticalResizeInPx: distanceResized.vertically,
      horizontalResizeInPx: distanceResized.horizontally,
   }
}
