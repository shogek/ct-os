import { useAtomValue } from 'jotai'
import { Desktop } from './components/desktop/desktop.component'
import { Shortcut } from './components/shortcut/shortcut.component'
import { Calculator } from './features/calculator/calculator.component'
import { activeApplicationsAtom } from './atoms/active-applications.atom'

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
      <Desktop>
         {shortcuts.map((shortcut) => (
            <Shortcut key={shortcut.id} title={shortcut.title} />
         ))}

         {activeApplications.map((activeApp) => (
            <Calculator key={activeApp.id} id={activeApp.id} />
         ))}
      </Desktop>
   )
}
