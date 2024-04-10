import s from './notes-item.module.scss'

type NotesItemProps = {
   text: string
}

export function NotesItem(props: NotesItemProps) {
   return (
      <div className={s.notesItem}>
         <input type="checkbox" />
         <input type="text" className={s.text} value={props.text} />
         <button>x</button>
      </div>
   )
}
