const express = require('express')
const { MongoClient } = require('mongodb');
const utils = require('./utils')
const app = express()
const port = process.env.EXPRESS_PORT
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const DB_NAME = 'cloud-waf'
const COLLECTION_NAME = 'hosts'
let hosts;

client.connect((err) => {
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }
  hosts = client.db(DB_NAME).collection(COLLECTION_NAME);
  app.listen(port, () => {
    console.log(`nodeapi listening at http://0.0.0.0:${port}`)
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/add/', async (req, res) => {
  const { hostname } = req.query
  const host = await hosts.findOne({ hostname })
  if (host) {
    if(utils.addNginxConf(host.hostname, host.origin, host.port) >= 0) {
      res.send({
        status: 0,
        msg: `Added ${hostname}.conf to cloud waf!`
      })
    } else {
      res.send({
        status: -1,
        msg: `Add ${hostname}.conf failed!`
      })
    }
  } else {
    res.send({
      status: -1,
      msg: `Can't find ${hostname} in the database!`
    })
  }
})

app.get('/delete/', async (req, res) => {
  const { hostname } = req.query
  const host = await hosts.findOne({ hostname })
  if (host) {
    const status = utils.deleteNginxConf(host.hostname)
    if(status === 0) {
      res.send({
        status,
        msg: `Deleted ${hostname}.conf from cloud waf!`
      })
    } else if (status === -1) {
      res.send({
        status,
        msg: `Delete ${hostname}.conf failed!`
      })
    } else if (status === 1) {
      res.send({
        status,
        msg: `${hostname}.conf.conf doesn't exist!`
      })
    }
  } else {
    res.send({
      status: -1,
      msg: `${hostname}.conf.conf doesn't exist!`
    })
  }
})
