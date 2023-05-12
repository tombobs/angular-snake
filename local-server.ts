const express = require('express')
const app = express()

app.use(express.static('dist/angular-snake'))

app.listen(4201, '192.168.1.104')
