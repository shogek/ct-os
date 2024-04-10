import { useAtomValue } from 'jotai'
import { Desktop } from './components/desktop/desktop.component'
import { NotesDynamic } from './features/notes/notes-dynamic.component'
import { CalculatorDynamic } from './features/calculator/calculator-dynamic.component'
import { openAppsAtom } from './atoms/opened-apps.atom'
import { Taskbar } from './components/taskbar/taskbar'
import { APP_TYPE } from './general/types/app.types'
import { ShortcutList } from './components/shortcut-list/shortcut-list'

export default function App() {
   const openApps = useAtomValue(openAppsAtom)

   return (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
         <Desktop>
            <ShortcutList />

            {openApps.map((openApp) => {
               switch (openApp.type) {
                  case APP_TYPE.CALCULATOR:
                     return <CalculatorDynamic key={openApp.id} openApp={openApp} />
                  case APP_TYPE.EXPLORER:
                     return <CalculatorDynamic key={openApp.id} openApp={openApp} />
                  case APP_TYPE.NOTEPAD:
                     return <NotesDynamic key={openApp.id} openApp={openApp} />
                  default:
                     assertExhaustiveSwitchStatement(openApp.type)
               }
            })}
         </Desktop>

         <Taskbar />
      </div>
   )
}
