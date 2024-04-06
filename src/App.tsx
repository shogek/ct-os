import { useAtomValue } from 'jotai'
import { Desktop } from './components/desktop/desktop.component'
import { Shortcut } from './components/shortcut/shortcut.component'
import { Calculator } from './features/calculator/calculator.component'
import { openAppsAtom } from './atoms/opened-apps.atom'
import { Taskbar } from './components/taskbar/taskbar'
import { APP_DEFINITION_CONFIG } from './general/configs/app-definition.configs'
import { APP_TYPE } from './general/types/app.types'

export default function App() {
   const openApps = useAtomValue(openAppsAtom)

   return (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
         <Desktop>
            {APP_DEFINITION_CONFIG.map((app) => (
               <Shortcut key={app.name} app={app} />
            ))}

            {openApps.map((openApp) => {
               switch (openApp.type) {
                  case APP_TYPE.CALCULATOR:
                     return <Calculator key={openApp.id} openApp={openApp} />
                  case APP_TYPE.EXPLORER:
                     return <Calculator key={openApp.id} openApp={openApp} />
                  case APP_TYPE.NOTEPAD:
                     return <Calculator key={openApp.id} openApp={openApp} />
                  default:
                     assertExhaustiveSwitchStatement(openApp.type)
               }
            })}
         </Desktop>

         <Taskbar />
      </div>
   )
}
