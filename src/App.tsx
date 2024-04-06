import { useAtomValue } from 'jotai'
import { Desktop } from './components/desktop/desktop.component'
import { Shortcut } from './components/shortcut/shortcut.component'
import { Calculator } from './features/calculator/calculator.component'
import { activeApplicationsAtom } from './atoms/active-applications.atom'
import { Taskbar } from './components/taskbar/taskbar'

export default function App() {
   const activeApplications = useAtomValue(activeApplicationsAtom)

   const shortcuts = [
      {
         id: 1,
         title: 'Calculator',
      },
      {
         id: 2,
         title: 'Notepad',
      },
      {
         id: 3,
         title: 'Explorer',
      },
   ]

   return (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
         <Desktop>
            {shortcuts.map((shortcut) => (
               <Shortcut key={shortcut.id} title={shortcut.title} />
            ))}

            {activeApplications.map((activeApp) => (
               <Calculator key={activeApp.id} id={activeApp.id} />
            ))}
         </Desktop>

         <Taskbar />
      </div>
   )
}
