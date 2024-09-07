import { PropsWithChildren, useRef, useState } from 'react'
import { useSetAtom } from 'jotai'
import { clsx } from 'clsx'
import { getRandomNumberBetween } from '../../general/helpers/number.helpers'
import { openAppsAtom } from '../../atoms/opened-apps.atom'
import { useDragging } from './use-dragging.hook'
import { useResizing } from './use-resizing.hook'
import { DynamicIcon } from '../icons/icon'
import { ICON_TYPE } from '../../general/types/icon.types'
import { appService } from '../../general/services/app.service'
import { OpenApp } from '../../general/types/app.types'
import s from './app-header.module.scss'

type AppHeaderProps = {
   openApp: OpenApp
}

export function AppHeader(props: PropsWithChildren<AppHeaderProps>) {
   const setOpenApps = useSetAtom(openAppsAtom)

   const [randomTop] = useState(getRandomNumberBetween(10, 100))
   const [randomLeft] = useState(getRandomNumberBetween(100, 800))
   const appBorderRef = useRef<HTMLDivElement>(null)
   const appHeaderRef = useRef<HTMLDivElement>(null)

   const { horizontalDragInPx, verticalDragInPx } = useDragging({ elToDrag: appHeaderRef })
   const { canResize, horizontalResizeInPx, verticalResizeInPx } = useResizing({ elToResize: appBorderRef })

   const handleOnMouseDown = () => {
      setOpenApps((openApps) => appService.focus({ openApps, appId: props.openApp.id }))
   }

   const handleCloseButtonClick = () => {
      setOpenApps((openApps) => appService.close({ openApps, appId: props.openApp.id }))
   }

   const handleMaximizeButtonClick = () => {
      setOpenApps((openApps) =>
         props.openApp.isMaximized
            ? appService.unMaximize({ openApps, appId: props.openApp.id })
            : appService.maximize({ openApps, appId: props.openApp.id }),
      )
   }

   const handleMinimizeButtonClick = () => {
      setOpenApps((openApps) => appService.minimize({ openApps, appId: props.openApp.id }))
   }

   return (
      <div
         style={{
            width: props.openApp.isMaximized ? '100%' : 250 + horizontalResizeInPx + 'px',
            height: props.openApp.isMaximized ? '100%' : 300 + verticalResizeInPx + 'px',
            display: props.openApp.isMinimized ? 'none' : 'flex',
            top: props.openApp.isMaximized ? 0 : randomTop + verticalDragInPx,
            left: props.openApp.isMaximized ? 0 : randomLeft + horizontalDragInPx,
            zIndex: props.openApp.zIndex,
         }}
         ref={appBorderRef}
         className={clsx(s.appHeader, {
            [s._resized]: canResize,
            [s._focused]: props.openApp.isFocused,
         })}
         onMouseDown={handleOnMouseDown}
      >
         <div className={s.header} ref={appHeaderRef}>
            <span className={s.title}>{props.openApp.name}</span>

            <ul className={s.buttonList}>
               <li>
                  <button type="button" className={s.button} onClick={handleMinimizeButtonClick}>
                     <DynamicIcon type={ICON_TYPE.UNDERSCORE} iconProps={{ className: s.icon }} />
                  </button>
               </li>
               <li>
                  <button type="button" className={s.button} onClick={handleMaximizeButtonClick}>
                     <DynamicIcon type={ICON_TYPE.WINDOWS} iconProps={{ className: s.icon }} />
                  </button>
               </li>

               <li>
                  <button type="button" className={s.button} onClick={handleCloseButtonClick}>
                     <DynamicIcon type={ICON_TYPE.CLOSE} iconProps={{ className: s.icon }} />
                  </button>
               </li>
            </ul>
         </div>

         {props.children}
      </div>
   )
}
