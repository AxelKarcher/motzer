import { useState, useEffect } from 'react'

import './App.scss'
import Cell from './components/Cell.jsx'

const tmp = ['AXEL', 'YES', 'BITE']

function App() {

  const [word, setWord] = useState()
  const [tries, setTries] = useState([[], [], [], [], []])
  const [colors, setColors] = useState([[], [], [], [], []])
  const [tryNb, setTryNb] = useState(0)

  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  useEffect(() => {
    setWord(tmp[Math.floor(Math.random() * tmp.length)])
    // window.addEventListener('keydown', (event) => addToUserInput(event.key.toUpperCase()))
  }, [])

  useEffect(() => {
    if (word === undefined || (tries[tryNb]?.length !== word?.length)) { return }

    let newColors = [...colors]

    for (let i = 0; i !== word.length; i++) {
      if (tries[tryNb][i] === word[i]) {
        newColors[tryNb].push('red')
      } else if (word.includes(tries[tryNb][i])) {
        newColors[tryNb].push('yellow')
      } else {
        newColors[tryNb].push('')
      }
    }
    setColors(newColors)
    setTryNb(tryNb + 1)
  }, [tries])

  const addToUserInput = (char) => {
    let newTries = [...tries]

    if (char === 'ALT' || char === 'ENTER' || char === 'CONTROL') { return }
    if (char === 'BACKSPACE') {
      if (tries[tryNb].length === 0) {
        newTries[tryNb] = ''
        return
      } else {
        newTries[tryNb].slice(0, -1)
        return
      }
    }

    newTries[tryNb].push(char)
    setTries(newTries)
  }

  return (
    <div id='appContainer'>
      <img
        style={{ position: 'absolute', top: 20 }}
        src={ require('./assets/logo.png') }
        alt='logo'
      />
      <div id='cells'>
        {
          [0, 1, 2, 3, 4].map((elem1, i) => (
            <div key={ i } className='cellsRow'>
              {
                word !== undefined &&
                word.split('').map((elem2, i) => (
                  <Cell
                    key={ i }
                    index={ i }
                    id={ elem1 }
                    userInput={ tries[elem1] }
                    colors={ colors[elem1] }
                    tryNb={ tryNb }
                  />
                ))
              }
            </div>
          ))
        }
      </div>
      <div>
        {
          alpha.split('').map((elem, i) => (
            <button key={ i } onClick={() => addToUserInput(elem)}>{ elem }</button>
          ))
        }
      </div>
    </div>
  )
}

export default App
