import { APP_TYPE } from './app.types'
import { ICON_TYPE } from './icon.types'

/** An application that can be opened */
export type Shortcut = {
   name: string
   type: APP_TYPE
   icon: ICON_TYPE
}
