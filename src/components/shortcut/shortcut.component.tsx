import { useState } from 'react'
import { useSetAtom } from 'jotai'
import clsx from 'clsx'
import { IconCalculator } from '../icons/icon-calculator'
import { IconExplorer } from '../icons/icon-explorer'
import { IconNotepad } from '../icons/icon-notepad'
import { activeApplicationsAtom } from '../../atoms/active-applications.atom'
import { getRandomNumberBetween } from '../../general/helpers/number.helpers'
import s from './shortcut.module.scss'

type ShortcutProps = {
   title: string
}

export function Shortcut(props: ShortcutProps) {
   const setActiveApplications = useSetAtom(activeApplicationsAtom)
   const [isSelected, setIsSelected] = useState(false)

   const handleElementOnClick = () => {
      if (!isSelected) {
         setIsSelected(true)
         return
      }

      setIsSelected(false)

      setActiveApplications((apps) => [
         ...apps,
         {
            id: getRandomNumberBetween(1, 1_000_000),
            title: props.title,
         },
      ])
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
