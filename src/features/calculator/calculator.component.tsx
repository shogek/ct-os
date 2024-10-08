import { useState, MouseEvent } from 'react'
import { AppHeader } from '../../components/app-header/app-header'
import { CalculatorProps } from './types'
import s from './calculator.module.scss'

export default function Calculator(props: CalculatorProps) {
   const [screen, setScreen] = useState('')

   const handleDigitClick = (e: MouseEvent<HTMLButtonElement>) => {
      const digit = e.currentTarget.innerText
      setScreen((prevState) => `${prevState}${digit}`)
   }

   const handleSymbolClick = (e: MouseEvent<HTMLButtonElement>) => {
      const symbol = e.currentTarget.innerText
      setScreen((prevState) => `${prevState} ${symbol} `)
   }

   const handleEqualsClick = () => {
      const safeScreen = screen.replaceAll('×', '*')
      const result = eval(safeScreen)
      setScreen((prevState) => `${prevState} = ${result}`)
   }

   return (
      <AppHeader openApp={props.openApp}>
         <div className={s.calculator}>
            <div className={s.screen}>{screen}</div>

            <div className={s.buttons}>
               <button onClick={handleDigitClick}>7</button>
               <button onClick={handleDigitClick}>8</button>
               <button onClick={handleDigitClick}>9</button>
               <button onClick={handleSymbolClick}>×</button>

               <button onClick={handleDigitClick}>4</button>
               <button onClick={handleDigitClick}>5</button>
               <button onClick={handleDigitClick}>6</button>
               <button onClick={handleSymbolClick}>-</button>

               <button onClick={handleDigitClick}>1</button>
               <button onClick={handleDigitClick}>2</button>
               <button onClick={handleDigitClick}>3</button>
               <button onClick={handleSymbolClick}>+</button>

               <button className={s.twoCol} onClick={handleDigitClick}>
                  0
               </button>
               <button onClick={handleSymbolClick}>.</button>
               <button onClick={handleEqualsClick}>=</button>
            </div>
         </div>
      </AppHeader>
   )
}
