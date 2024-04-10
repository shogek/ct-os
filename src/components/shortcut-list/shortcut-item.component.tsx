import clsx from 'clsx'
import { DynamicIcon } from '../icons/icon'
import { Shortcut } from '../../general/types/shortcut.types'
import s from './shortcut-item.module.scss'

type ShortcutProps = {
   shortcut: Shortcut
   isSelected: boolean
   onClicked: (name: string) => void
}

export function ShortcutItem(props: ShortcutProps) {
   return (
      <div
         className={clsx(s.shortcutItem, { [s._selected]: props.isSelected })}
         onClick={() => props.onClicked(props.shortcut.name)}
      >
         <div className={s.iconWrapper}>
            <DynamicIcon type={props.shortcut.icon} iconProps={{ className: s.icon }} />
         </div>

         <span className={s.title}>{props.shortcut.name}</span>
      </div>
   )
}
