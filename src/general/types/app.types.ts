import { ICON_TYPE } from './icon.types'

/** An application that can be opened but is not at the moment */
export type App = {
   name: string
   type: APP_TYPE
   icon: ICON_TYPE
}

/** An application that was opened and is now usable by the user */
export type OpenApp = {
   id: string
   name: string
   type: APP_TYPE
   icon: ICON_TYPE
   zIndex: number
}

export enum APP_TYPE {
   CALCULATOR = 'Calculator',
   NOTEPAD = 'Notepad',
   EXPLORER = 'Explorer',
}
