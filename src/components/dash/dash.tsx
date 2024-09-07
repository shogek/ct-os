import { memo } from 'react'
import { SHORTCUT_CONFIG } from '../../general/configs/shortcut.configs'
import { DashShortcut } from './components/dash-shortcut/dash-shortcut'
import s from './dash.module.scss'

function _Dash() {
   return (
      <div className={s.wrapper}>
         <ul className={s.shortcutList}>
            {SHORTCUT_CONFIG.map((shortcut) => (
               <li key={shortcut.name} className={s.shortcutItem}>
                  <DashShortcut name={shortcut.name} icon={shortcut.icon} />
               </li>
            ))}
         </ul>
      </div>
   )
}

export const Dash = memo(_Dash)
