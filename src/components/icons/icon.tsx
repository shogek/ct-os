import { IconCalculator } from './icon-calculator'
import { IconClose } from './icon-close'
import { IconFolder } from './icon-folder'
import { IconNote } from './icon-note'
import { ICON_TYPES, IconProps } from './types'

function getIcon(type: ICON_TYPES, props?: IconProps): JSX.Element {
   switch (type) {
      case ICON_TYPES.CALCULATOR:
         return <IconCalculator {...props} />
      case ICON_TYPES.CLOSE:
         return <IconClose {...props} />
      case ICON_TYPES.FOLDER:
         return <IconFolder {...props} />
      case ICON_TYPES.NOTE:
         return <IconNote {...props} />
      default:
         assertExhaustiveSwitchStatement(type)
   }
}

type DynamicIcon = {
   type: ICON_TYPES
   iconProps?: IconProps
}

export function DynamicIcon(props: DynamicIcon) {
   return getIcon(props.type, props.iconProps)
}
