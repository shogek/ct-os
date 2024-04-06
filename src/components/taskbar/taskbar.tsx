import { useAtomValue } from 'jotai'
import { activeApplicationsAtom } from '../../atoms/active-applications.atom'
import { DynamicIcon } from '../icons/icon'
import s from './taskbar.module.scss'

export function Taskbar() {
   const activeApplications = useAtomValue(activeApplicationsAtom)

   return (
      <div className={s.taskbar}>
         {activeApplications.map((activeApp) => (
            <div key={activeApp.id} className={s.item} title={`${activeApp.id} | ${activeApp.title}`}>
               <DynamicIcon type={activeApp.icon} iconProps={{ className: s.icon }} />
            </div>
         ))}
      </div>
   )
}
