import { useAtomValue } from 'jotai'
import { openAppsAtom } from '../../atoms/opened-apps.atom'
import { DynamicIcon } from '../icons/icon'
import s from './taskbar.module.scss'

export function Taskbar() {
   const openApps = useAtomValue(openAppsAtom)

   return (
      <div className={s.taskbar}>
         {openApps.map((openApp) => (
            <div key={openApp.id} className={s.item} title={`${openApp.id} | ${openApp.name}`}>
               <DynamicIcon type={openApp.icon} iconProps={{ className: s.icon }} />
            </div>
         ))}
      </div>
   )
}
