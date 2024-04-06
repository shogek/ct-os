import { ICON_TYPE } from '../../general/types/icon.types'
import { IconCalculator } from './icon-calculator'
import { IconClose } from './icon-close'
import { IconFolder } from './icon-folder'
import { IconNote } from './icon-note'
import { IconProps } from './types'

function getIcon(type: ICON_TYPE, props?: IconProps): JSX.Element {
   switch (type) {
      case ICON_TYPE.CALCULATOR:
         return <IconCalculator {...props} />
      case ICON_TYPE.CLOSE:
         return <IconClose {...props} />
      case ICON_TYPE.FOLDER:
         return <IconFolder {...props} />
      case ICON_TYPE.NOTE:
         return <IconNote {...props} />
      default:
         assertExhaustiveSwitchStatement(type)
   }
}

type DynamicIcon = {
   type: ICON_TYPE
   iconProps?: IconProps
}

export function DynamicIcon(props: DynamicIcon) {
   return getIcon(props.type, props.iconProps)
}
