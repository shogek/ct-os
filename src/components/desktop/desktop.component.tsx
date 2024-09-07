import { memo } from 'react'
import { openAppsAtom } from '../../atoms/opened-apps.atom'
import { useAtomValue } from 'jotai'
import { CalculatorDynamic } from '../../features/calculator/calculator-dynamic.component'
import { NotesDynamic } from '../../features/notes/notes-dynamic.component'
import { APP_TYPE } from '../../general/types/app.types'
import s from './desktop.module.scss'

function _Desktop() {
   const openApps = useAtomValue(openAppsAtom)

   return (
      <div className={s.desktop}>
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
      </div>
   )
}

export const Desktop = memo(_Desktop)
