import { OpenApp, App } from './app.types'

export interface IAppService {
   open(params: OpenParams): OpenApp[]
   close(params: CloseParams): OpenApp[]
   focus(params: FocusParams): OpenApp[]
}

export type OpenParams = {
   openApps: OpenApp[]
   app: App
}

export type CloseParams = {
   openApps: OpenApp[]
   appId: string
}

export type FocusParams = {
   openApps: OpenApp[]
   appId: string
}
