import { atom } from 'jotai'

type ActiveApplication = {
   id: number
   title: string
}

export const activeApplicationsAtom = atom<ActiveApplication[]>([])
