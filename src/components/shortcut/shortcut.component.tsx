import { useState } from 'react'
import { useSetAtom } from 'jotai'
import clsx from 'clsx'
import { activeApplicationsAtom } from '../../atoms/active-applications.atom'
import { getRandomNumberBetween } from '../../general/helpers/number.helpers'
import { ICON_TYPES } from '../icons/types'
import { DynamicIcon } from '../icons/icon'
import s from './shortcut.module.scss'

type ShortcutProps = {
   title: string
   icon: ICON_TYPES
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
            icon: props.icon,
         },
      ])
   }

   return (
      <div className={clsx(s.shortcut, { [s._selected]: isSelected })} onClick={handleElementOnClick}>
         <div className={s.iconWrapper}>
            <DynamicIcon type={props.icon} iconProps={{ className: s.icon }} />
         </div>
         <span className={s.title}>{props.title}</span>
      </div>
   )
}
