const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const Pusher = require('pusher')
const pusher = new Pusher({
  appId:   process.env.PUSHER_APP_ID,
  key:     process.env.PUSHER_KEY,
  secret:  process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/pusher/auth', (req, res) => {
  const socket_id     = req.body.socket_id
  const channel_name  = req.body.channel_name
  if(socket_id && channel_name) {
    res.send(Pusher.authenticate(
      socket_id,
      channel_name,
      {user_id: socket_id, user_info: {}}
    ))
  } else {
    res.sendStatus(401)
  }
})

app.listen(process.env.PORT || 3000)
