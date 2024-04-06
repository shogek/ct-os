import { useAtomValue } from 'jotai'
import { activeApplicationsAtom } from '../../atoms/active-applications.atom'
import { IconCalculator } from '../icons/icon-calculator'
import { IconExplorer } from '../icons/icon-explorer'
import { IconNotepad } from '../icons/icon-notepad'
import s from './taskbar.module.scss'

export function Taskbar() {
   const activeApplications = useAtomValue(activeApplicationsAtom)

   return (
      <div className={s.taskbar}>
         {activeApplications.map((activeApp) => (
            <div key={activeApp.id} className={s.item} title={`${activeApp.id} | ${activeApp.title}`}>
               {activeApp.title === 'Notepad' && <IconNotepad />}
               {activeApp.title === 'Calculator' && <IconCalculator />}
               {activeApp.title === 'Explorer' && <IconExplorer />}
            </div>
         ))}
      </div>
   )
}
