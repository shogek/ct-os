import { OpenApp } from './app.types'
import { Shortcut } from './shortcut.types'

export interface IAppService {
   open(params: OpenParams): OpenApp[]
   close(params: CommonParams): OpenApp[]
   focus(params: CommonParams): OpenApp[]
   minimize(params: CommonParams): OpenApp[]
   unMinimize(params: CommonParams): OpenApp[]
   maximize(params: CommonParams): OpenApp[]
   unMaximize(params: CommonParams): OpenApp[]
}

export type OpenParams = {
   openApps: OpenApp[]
   shortcut: Shortcut
}

export type CommonParams = {
   openApps: OpenApp[]
   appId: string
}
