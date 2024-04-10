import { useAtom } from 'jotai'
import clsx from 'clsx'
import { openAppsAtom } from '../../atoms/opened-apps.atom'
import { DynamicIcon } from '../icons/icon'
import { OpenApp } from '../../general/types/app.types'
import { appService } from '../../general/services/app.service'
import s from './taskbar.module.scss'

export function Taskbar() {
   const [openApps, setOpenApps] = useAtom(openAppsAtom)

   const handleItemClick = (openApp: OpenApp) => {
      setOpenApps((apps) => {
         if (!openApp.isFocused) {
            return appService.unMinimize({ openApps: apps, appId: openApp.id })
         }

         if (openApp.isMinimized) {
            return appService.unMinimize({ openApps: apps, appId: openApp.id })
         }

         return appService.minimize({ openApps: apps, appId: openApp.id })
      })
   }

   return (
      <div className={s.taskbar}>
         {openApps.map((openApp) => (
            <div
               key={openApp.id}
               className={clsx(s.item, { [s._focused]: openApp.isFocused })}
               title={`${openApp.id} | ${openApp.name}`}
               onClick={() => handleItemClick(openApp)}
            >
               <DynamicIcon type={openApp.icon} iconProps={{ className: s.icon }} />
            </div>
         ))}
      </div>
   )
}
