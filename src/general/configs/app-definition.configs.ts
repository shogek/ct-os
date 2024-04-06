import { APP_TYPE, App } from '../types/app.types'
import { ICON_TYPE } from '../types/icon.types'

export const APP_DEFINITION_CONFIG: readonly App[] = Object.freeze([
   {
      name: 'Calculator',
      type: APP_TYPE.CALCULATOR,
      icon: ICON_TYPE.CALCULATOR,
   },
   {
      name: 'Explorer',
      type: APP_TYPE.EXPLORER,
      icon: ICON_TYPE.FOLDER,
   },
   {
      name: 'Notepad',
      type: APP_TYPE.NOTEPAD,
      icon: ICON_TYPE.NOTE,
   },
])
