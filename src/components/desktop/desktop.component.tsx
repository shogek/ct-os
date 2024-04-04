import { ReactNode } from 'react'
import s from './desktop.module.scss'

export function Desktop(props: { children: ReactNode }) {
   return <div className={s.desktop}>{props.children}</div>
}
