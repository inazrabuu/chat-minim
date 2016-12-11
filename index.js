const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
	console.log('a user connected')

	socket.on('chat message', (msg) => {
		io.emit('chat message', msg)
	})
	
	socket.on('disconnect', () => {
		console.log('a user disconnected')
	})
})

let port = 3000
http.listen(port, () => {
	console.log('server is listening on port : ' + port)
})