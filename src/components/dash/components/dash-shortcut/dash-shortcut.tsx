import { memo } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import clsx from 'clsx'
import { ICON_TYPE } from '../../../../general/types/icon.types'
import { DynamicIcon } from '../../../icons/icon'
import { SHORTCUT_CONFIG } from '../../../../general/configs/shortcut.configs'
import { openAppsAtom } from '../../../../atoms/opened-apps.atom'
import { appService } from '../../../../general/services/app.service'
import s from './dash-shortcut.module.scss'

type DashShortcutProps = {
   name: string
   icon: ICON_TYPE
}

function _DashShortcut(props: DashShortcutProps) {
   const openApps = useAtomValue(openAppsAtom)
   const setOpenApps = useSetAtom(openAppsAtom)

   const isAppOpened = !!openApps.find((x) => x.name === props.name)

   function handleShortcutClick() {
      const clickedShortcut = SHORTCUT_CONFIG.find((shortcut) => shortcut.name === props.name)
      if (!clickedShortcut) {
         throw new Error('Cannot find the shortcut clicked!')
      }

      setOpenApps((openApps) =>
         appService.open({
            openApps,
            shortcut: clickedShortcut,
         }),
      )
   }

   return (
      <div className={s.wrapper} title={props.name} onClick={handleShortcutClick}>
         <div className={clsx(s.indicator, { [s._active]: isAppOpened })}></div>

         <button type="button" className={s.button}>
            <DynamicIcon type={props.icon} iconProps={{ className: s.icon }} />
         </button>
      </div>
   )
}

export const DashShortcut = memo(_DashShortcut)
