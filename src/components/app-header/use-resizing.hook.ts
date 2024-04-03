import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

type Coords = {
   clientX: number
   clientY: number
}

export function useResizing(props: { elToResize: RefObject<HTMLElement> }) {
   const [isClicked, setIsClicked] = useState(false)
   const [isHovered, setIsHovered] = useState(false)
   const [distanceResized, setDistanceResized] = useState({ horizontally: 0, vertically: 0 })
   const lastClickRef = useRef<Coords>({ clientX: 0, clientY: 0 })

   // TODO: Check if `useCallback` really necessary
   const handleBorderMouseDown = useCallback((e: MouseEvent) => {
      if (!props.elToResize.current || !e.target) {
         return
      }

      // TODO: Explain me
      if (e.target.contains(props.elToResize.current)) {
         setIsClicked(true)
         lastClickRef.current = { clientX: e.clientX, clientY: e.clientY }
      } else {
         setIsClicked(false)
      }
   }, [])

   // TODO: Check if `useCallback` really necessary
   const handleBorderMouseOver = useCallback((e: MouseEvent) => {
      if (!e.target) {
         return
      }

      if (e.target.contains(props.elToResize.current)) {
         setIsHovered(true)
      } else {
         setIsHovered(false)
      }
   }, [])

   // TODO: Check if `useCallback` needed
   const handleDocumentMouseMove = (e: MouseEvent) => {
      const movedHorizontally = e.clientX - lastClickRef.current.clientX
      const movedVertically = e.clientY - lastClickRef.current.clientY

      setDistanceResized((prev) => ({
         horizontally: prev.horizontally + movedHorizontally,
         vertically: prev.vertically + movedVertically,
      }))

      lastClickRef.current = { clientX: e.clientX, clientY: e.clientY }
   }

   // TODO: Check if `useCallback` really necessary
   const handleDocumentMouseUp = useCallback(() => {
      setIsClicked(false)
   }, [])

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
   }, [props.elToResize])

   return { ...distanceResized, canResize: isHovered }
}
