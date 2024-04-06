import { useAtomValue } from 'jotai'
import { Desktop } from './components/desktop/desktop.component'
import { Shortcut } from './components/shortcut/shortcut.component'
import { Calculator } from './features/calculator/calculator.component'
import { activeApplicationsAtom } from './atoms/active-applications.atom'
import { Taskbar } from './components/taskbar/taskbar'
import { ICON_TYPES } from './components/icons/types'

export default function App() {
   const activeApplications = useAtomValue(activeApplicationsAtom)

   const shortcuts = [
      {
         id: 1,
         title: 'Calculator',
         icon: ICON_TYPES.CALCULATOR,
      },
      {
         id: 2,
         title: 'Notepad',
         icon: ICON_TYPES.NOTE,
      },
      {
         id: 3,
         title: 'Explorer',
         icon: ICON_TYPES.FOLDER,
      },
   ]

   return (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
         <Desktop>
            {shortcuts.map((shortcut) => (
               <Shortcut key={shortcut.id} title={shortcut.title} icon={shortcut.icon} />
            ))}

            {activeApplications.map((activeApp) => (
               <Calculator key={activeApp.id} id={activeApp.id} />
            ))}
         </Desktop>

         <Taskbar />
      </div>
   )
}
