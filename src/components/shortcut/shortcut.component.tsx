import { useState } from 'react'
import { useSetAtom } from 'jotai'
import clsx from 'clsx'
import { openAppsAtom } from '../../atoms/opened-apps.atom'
import { DynamicIcon } from '../icons/icon'
import { appService } from '../../general/services/app.service'
import { App } from '../../general/types/app.types'
import s from './shortcut.module.scss'

type ShortcutProps = {
   app: App
}

export function Shortcut(props: ShortcutProps) {
   const setOpenApps = useSetAtom(openAppsAtom)
   const [isSelected, setIsSelected] = useState(false)

   const handleElementOnClick = () => {
      if (!isSelected) {
         setIsSelected(true)
         return
      }

      setIsSelected(false)

      setOpenApps((openApps) =>
         appService.open({
            openApps,
            app: props.app,
         }),
      )
   }

   return (
      <div className={clsx(s.shortcut, { [s._selected]: isSelected })} onClick={handleElementOnClick}>
         <div className={s.iconWrapper}>
            <DynamicIcon type={props.app.icon} iconProps={{ className: s.icon }} />
         </div>

         <span className={s.title}>{props.app.name}</span>
      </div>
   )
}
