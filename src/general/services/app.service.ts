import { getRandomId } from '../helpers/number.helpers'
import { CommonParams, IAppService, OpenParams } from '../types/app-service.types'
import { OpenApp } from '../types/app.types'

class AppService implements IAppService {
   open({ openApps, shortcut: app }: OpenParams): OpenApp[] {
      const newApp: OpenApp = {
         id: getRandomId(),
         name: app.name,
         type: app.type,
         icon: app.icon,
         // Newly opened applications always go on top of everything
         zIndex: openApps.length + 1,
         isFocused: true,
         isMinimized: false,
         isMaximized: false,
      }

      const appsInBackground = openApps.map((x) => ({ ...x, isFocused: false }))

      return [newApp, ...appsInBackground]
   }

   close({ openApps, appId }: CommonParams): OpenApp[] {
      return openApps.filter((x) => x.id !== appId)
   }

   focus({ openApps, appId }: CommonParams): OpenApp[] {
      const appToFocus = openApps.find((x) => x.id === appId)
      if (!appToFocus) {
         throw new Error('It is not possible to focus on an app that is not opened')
      }

      if (appToFocus.zIndex === openApps.length) {
         // Don't refocus on an app that is already on top
         return openApps
      }

      const referenceZIndex = appToFocus.zIndex

      return openApps.map((x): OpenApp => {
         if (x.id === appId) {
            // Move the target app closest to the screen
            return { ...x, zIndex: openApps.length, isFocused: true }
         }

         if (x.zIndex > referenceZIndex) {
            // Move all the apps that were in front on the target app one level back
            return { ...x, zIndex: x.zIndex - 1, isFocused: false }
         }

         return x
      })
   }

   minimize({ openApps, appId }: CommonParams): OpenApp[] {
      return openApps.map((openApp): OpenApp => {
         if (openApp.id !== appId) {
            return openApp
         }

         return { ...openApp, isMinimized: true, isFocused: false }
      })
   }

   unMinimize({ openApps, appId }: CommonParams): OpenApp[] {
      const focusSorted = openApps.map((openApp): OpenApp => {
         if (openApp.id !== appId) {
            return { ...openApp, isFocused: false }
         }

         return { ...openApp, isMinimized: false, isFocused: true }
      })

      return this.focus({ openApps: focusSorted, appId })
   }

   maximize({ openApps, appId }: CommonParams): OpenApp[] {
      return openApps.map((openApp): OpenApp => {
         if (openApp.id !== appId) {
            return openApp
         }

         return { ...openApp, isMaximized: true }
      })
   }

   unMaximize({ openApps, appId }: CommonParams): OpenApp[] {
      return openApps.map((openApp): OpenApp => {
         if (openApp.id !== appId) {
            return openApp
         }

         return { ...openApp, isMaximized: false }
      })
   }
}

export const appService = new AppService()
