import { useState } from 'react'
import clsx from 'clsx'
import { IconCalculator } from '../icons/icon-calculator'
import { IconExplorer } from '../icons/icon-explorer'
import { IconNotepad } from '../icons/icon-notepad'
import s from './shortcut.module.scss'

type ShortcutProps = {
   title: string
}

export function Shortcut(props: ShortcutProps) {
   const [isSelected, setIsSelected] = useState(false)

   const handleElementOnClick = () => {
      if (!isSelected) {
         setIsSelected(true)
         return
      }

      // TODO: Open the app
      setIsSelected(false)
   }

   return (
      <div className={clsx(s.shortcut, { [s._selected]: isSelected })} onClick={handleElementOnClick}>
         <div className={s.icon}>
            {props.title === 'Notepad' && <IconNotepad />}
            {props.title === 'Calculator' && <IconCalculator />}
            {props.title === 'Explorer' && <IconExplorer />}
         </div>
         <span className={s.title}>{props.title}</span>
      </div>
   )
}
