const server = require('./server')

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

server.listen(PORT, HOST)
