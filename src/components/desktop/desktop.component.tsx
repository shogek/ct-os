import s from './desktop.module.scss'

export function Desktop(props: { children: JSX.Element }) {
   return <div className={s.desktop}>{props.children}</div>
}
