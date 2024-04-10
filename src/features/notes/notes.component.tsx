import { AppHeader } from '../../components/app-header/app-header.component'
import { NotesProps } from './types'
import { NotesItem } from './notes-item'
import s from './notes.module.scss'

export default function Notes(props: NotesProps) {
   const items = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5']

   return (
      <AppHeader openApp={props.openApp}>
         <div className={s.notes}>
            <ul className={s.list}>
               {items.map((item) => (
                  <NotesItem key={item} text={item} />
               ))}
            </ul>
            <button type="button">Add item</button>
         </div>
      </AppHeader>
   )
}
