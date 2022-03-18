import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { VscDebugRestart } from 'react-icons/vsc'

import './App.scss'
import Cell from './components/Cell.jsx'

function App() {

  const abc = 'azertyuiopqsdfghjklmwxcvbn'

  const [word, setWord] = useState()
  const [tries, setTries] = useState([[], [], [], [], []])
  const [colors, setColors] = useState([[], [], [], [], []])
  const [tryNb, setTryNb] = useState(0)
  const [compo, setCompo] = useState()

  useEffect(() => { getNewWord() }, [])

  useEffect(() => {
    if (word === undefined) { return }

    getWordCompo()
  }, [word])

  const getWordCompo = () => {
    let newCompo = new Map

    word.split('').forEach(elem => {
      if (newCompo[elem] === undefined) {
        newCompo[elem] = 1
      } else {
        newCompo[elem] += 1
      }
    })
    setCompo(newCompo)
  }

  useEffect(() => {
    if (word === undefined || (tries[tryNb]?.length !== word?.length)) { return }

    let newColors = [...colors]
    let currColor = Array(word.length)
    let newCompo = {...compo}

    tries[tryNb].forEach((elem, i) => {
      if (elem === word[i]) {
        currColor[i] = '#39FF14'
        newCompo[elem] -= 1
      }
    })

    tries[tryNb].forEach((elem, i) => {
      if (word.includes(elem) && newCompo[elem] > 0) {
        currColor[i] = 'yellow'
        newCompo[elem] -= 1
      }
    })

    newColors[tryNb] = currColor
    setColors(newColors)

    if (tries[tryNb].join('') === word) {
      setTryNb(-1)
    } else {
      setTryNb(tryNb + 1)
    }
  }, [tries])

  const getNewWord = () => {
    axios.get('http://localhost:8000')
    .then(res => setWord(res.data))
  }

  const addToUserInput = (char) => {
    if (tryNb === -1) { return }

    let newTries = [...tries]

    newTries[tryNb].push(char)
    setTries(newTries)
  }

  const erase = () => {
    let newTries = [...tries]
    let current = newTries[tryNb]

    if (current.length === 0) {
      current = []
    } else {
      current.pop()
    }
    setTries(newTries)
  }

  const restart = () => {
    setTries([[], [], [], [], []])
    setColors([[], [], [], [], []])
    setTryNb(0)
    getNewWord()
    getWordCompo()
  }

  return (
    <div id='appContainer'>
      <img
        src={ require('./assets/logo.png') }
        alt='logo'
        height='15%'
      />
      <div id='cells'>
        {
          word !== undefined ?
          [0, 1, 2, 3, 4].map((elem1, i) => (
            <div key={ i } className='cellsRow'>
              {
                word.split('').map((elem2, i) => (
                  <Cell
                    key={ i }
                    index={ i }
                    id={ elem1 }
                    userInput={ tries[elem1].join('').toUpperCase() }
                    colors={ colors[elem1] }
                    tryNb={ tryNb }
                  />
                ))
              }
            </div>
          ))
          :
          'Looking for a word...'
        }
      </div>
      <div id='btns'>
        {
          abc.split('').map((elem, i) => (
            <Button
              key={ i }
              onClick={() => addToUserInput(elem)}
              variant='contained'
            >{ elem.toUpperCase() }</Button>
          ))
        }
        <Button
          onClick={() => erase() }
          variant='contained'
        ><RiDeleteBack2Fill size={ 23 }/></Button>

        <Button
          onClick={() => restart() }
          variant='contained'
        ><VscDebugRestart size={ 23 }/></Button>
      </div>
      <div id='infosText'>
        <div>Il n'y a pas de mot avec accent(s)</div>
        <div>En <span style={{ color: 'yellow' }}>jaune</span>: la lettre est dans le mot</div>
        <div>En <span style={{ color: '#39FF14' }}>vert</span>: la lettre est au bon endroit</div>
      </div>
    </div>
  )
}

export default App
