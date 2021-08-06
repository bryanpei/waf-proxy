const express = require('express')
const app = express()
const port = process.env.EXPRESS_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`nodeapi listening at http://0.0.0.0:${port}`)
})