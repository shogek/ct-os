import { Suspense, lazy } from 'react'
import { NotesProps } from './types'

const DynamicComponent = lazy(() => import('./notes.component'))

export const NotesDynamic = (props: NotesProps) => {
   return (
      <Suspense>
         <DynamicComponent {...props} />
      </Suspense>
   )
}
