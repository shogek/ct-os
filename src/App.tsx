import { Desktop } from './components/desktop/desktop.component'
import { Shortcut } from './components/shortcut/shortcut.component'
import { Calculator } from './features/calculator/calculator.component'

export default function App() {
   const shortcuts = [
      {
         id: 1,
         title: 'Calculator',
      },
      {
         id: 2,
         title: 'Notepad',
      },
      {
         id: 3,
         title: 'Explorer',
      },
   ]

   return (
      <Desktop>
         {shortcuts.map((shortcut) => (
            <Shortcut key={shortcut.id} title={shortcut.title} />
         ))}

         <Calculator />
         <Calculator />
         <Calculator />
      </Desktop>
   )
}
