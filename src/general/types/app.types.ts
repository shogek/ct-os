import { ICON_TYPE } from './icon.types'

/** An application that was opened and is now usable by the user */
export type OpenApp = {
   id: string
   name: string
   type: APP_TYPE
   icon: ICON_TYPE
   zIndex: number
   isFocused: boolean
   isMinimized: boolean
   isMaximized: boolean
}

export enum APP_TYPE {
   CALCULATOR = 'Calculator',
   NOTEPAD = 'Notepad',
   EXPLORER = 'Explorer',
}
