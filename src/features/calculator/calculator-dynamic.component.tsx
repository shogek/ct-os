import { Suspense, lazy } from 'react'
import { CalculatorProps } from './types'

const DynamicComponent = lazy(() => import('./calculator.component'))

export const CalculatorDynamic = (props: CalculatorProps) => {
   return (
      <Suspense>
         <DynamicComponent {...props} />
      </Suspense>
   )
}
