import { Suspense, lazy } from 'react'
import { ICON_TYPE } from '../../general/types/icon.types'
import { IconProps } from './types'

const DynamicIconCalculator = lazy(() => import('./icon-calculator'))
const DynamicIconClose = lazy(() => import('./icon-close'))
const DynamicIconFolder = lazy(() => import('./icon-folder'))
const DynamicIconNote = lazy(() => import('./icon-note'))
const DynamicIconUnderscore = lazy(() => import('./icon-underscore'))
const DynamicIconWindows = lazy(() => import('./icon-windows'))

function getIcon(type: ICON_TYPE, props?: IconProps) {
   switch (type) {
      case ICON_TYPE.CALCULATOR:
         return <DynamicIconCalculator {...props} />
      case ICON_TYPE.CLOSE:
         return <DynamicIconClose {...props} />
      case ICON_TYPE.FOLDER:
         return <DynamicIconFolder {...props} />
      case ICON_TYPE.NOTE:
         return <DynamicIconNote {...props} />
      case ICON_TYPE.WINDOWS:
         return <DynamicIconWindows {...props} />
      case ICON_TYPE.UNDERSCORE:
         return <DynamicIconUnderscore {...props} />
      default:
         assertExhaustiveSwitchStatement(type)
   }
}

type DynamicIcon = {
   type: ICON_TYPE
   iconProps?: IconProps
}

export function DynamicIcon(props: DynamicIcon) {
   return <Suspense>{getIcon(props.type, props.iconProps)}</Suspense>
}
