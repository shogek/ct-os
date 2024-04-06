import { atom } from 'jotai'
import { ICON_TYPES } from '../components/icons/types'

type ActiveApplication = {
   id: number
   title: string
   icon: ICON_TYPES
}

export const activeApplicationsAtom = atom<ActiveApplication[]>([])
