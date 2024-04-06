import { atom } from 'jotai'
import { OpenApp } from '../general/types/app.types'

/** This is where we store the currently opened applications */
export const openAppsAtom = atom<OpenApp[]>([])
