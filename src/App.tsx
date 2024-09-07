import { Desktop } from './components/desktop/desktop.component'
import { TopBar } from './components/top-bar/top-bar'
import { Dash } from './components/dash/dash'
import s from './App.module.scss'

export default function App() {
   return (
      <div className={s.wrapper}>
         <TopBar />

         <div className={s.desktop}>
            <Dash />
            <Desktop />
         </div>
      </div>
   )
}
