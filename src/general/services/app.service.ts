import { getRandomId } from '../helpers/number.helpers'
import { CloseParams, FocusParams, IAppService, OpenParams } from '../types/app-service.types'
import { OpenApp } from '../types/app.types'

class AppService implements IAppService {
   open({ openApps, app }: OpenParams): OpenApp[] {
      const newApp: OpenApp = {
         id: getRandomId(),
         name: app.name,
         type: app.type,
         icon: app.icon,
         // Newly opened applications always go on top of everything
         zIndex: openApps.length + 1,
         isFocused: true,
      }

      const appsInBackground = openApps.map((x) => ({ ...x, isFocused: false }))

      return [newApp, ...appsInBackground]
   }

   close({ openApps, appId }: CloseParams): OpenApp[] {
      return openApps.filter((x) => x.id !== appId)
   }

   focus({ openApps, appId }: FocusParams): OpenApp[] {
      const appToFocus = openApps.find((x) => x.id === appId)
      if (!appToFocus) {
         throw new Error('It is not possible to focus on an app that is not opened')
      }

      if (appToFocus.zIndex === openApps.length) {
         // Don't refocus on an app that is already on top
         return openApps
      }

      const referenceZIndex = appToFocus.zIndex

      return openApps.map((x) => {
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
}

export const appService = new AppService()
