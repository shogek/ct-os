import { APP_TYPE } from '../types/app.types'
import { ICON_TYPE } from '../types/icon.types'
import { Shortcut } from '../types/shortcut.types'

export const SHORTCUT_CONFIG: readonly Shortcut[] = Object.freeze([
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
