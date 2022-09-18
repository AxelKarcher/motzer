require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, console.log('Server started on port', process.env.PORT))

let words = []

fs.readFile('./wordList.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  } else {
    words = data?.replaceAll('\n', '')?.split('\r')
  }
})

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words?.length)]
}

app.get('/word', (req, res) => {
  res.send({word: getRandomWord()})
})