import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { openAppsAtom } from '../../atoms/opened-apps.atom'
import { SHORTCUT_CONFIG } from '../../general/configs/shortcut.configs'
import { appService } from '../../general/services/app.service'
import { ShortcutItem } from './shortcut-item.component'
import { Shortcut } from '../../general/types/shortcut.types'

export function ShortcutList(): JSX.Element {
   const setOpenApps = useSetAtom(openAppsAtom)
   const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(null)

   const handleShortcutClick = (shortcutName: string) => {
      const clickedShortcut = SHORTCUT_CONFIG.find((shortcut) => shortcut.name === shortcutName)

      if (!clickedShortcut) {
         // TODO: Throw new error?
         return
      }

      if (!selectedShortcut || selectedShortcut.name !== shortcutName) {
         setSelectedShortcut(clickedShortcut)
         return
      }

      setOpenApps((openApps) =>
         appService.open({
            openApps,
            shortcut: clickedShortcut,
         }),
      )
   }

   return (
      <>
         {SHORTCUT_CONFIG.map((shortcut) => (
            <ShortcutItem
               key={shortcut.name}
               shortcut={shortcut}
               isSelected={shortcut.name === selectedShortcut?.name}
               onClicked={handleShortcutClick}
            />
         ))}
      </>
   )
}
