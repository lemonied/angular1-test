const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
app.use(express.static(path.resolve(__dirname, './dist')))

const PORT = 8899

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})
