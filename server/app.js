require('dotenv').config()
const express = require('express')
const Express = express()
const Http = require('http').Server(Express)
const path = require('path')
const io = require('socket.io')(Http, {
    cors: {
        origin: process.env.CORS,
        methods: ["GET", "POST"]
      }
})
const Room = require('./Room.js')
const Nickname = require('./nicknames')

Express.use(express.static(path.join(__dirname, "../client/dist/")))

Express.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
})

let Rooms = {}

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on("disconnect", () => {
        if (Object.keys(Rooms).includes(socket.roomCode)) {
            leaveRoom(socket.roomCode, socket)
        }
    });

    socket.on('createNewRoom', (nickname) => {
        const roomCode = generateRoomCode()
        joinRoom(roomCode, nickname, socket)
    })

    socket.on('joinRoom', (data) => {
        // On rejoin la room seulement si le code entré est celui d'une room créée
        if (Object.keys(Rooms).includes(data.code) && Rooms[data.code].isPlaying == false) {
            joinRoom(data.code, data.nickname, socket)
        }
    })

    socket.on('startGame', (word) => {
        const otherPlayers = Object.assign({}, Rooms[socket.roomCode].players)
        delete otherPlayers[socket.id]
        const otherPlayersIds = Object.keys(otherPlayers)
        Rooms[socket.roomCode].isPlaying = true
        setRoles(otherPlayersIds, word, socket)
    })

    socket.on('startChrono', () => {
        io.in(socket.roomCode).emit('chronoStarted')
    })

    socket.on('endGame', () => {
        console.log("endGame")
        Rooms[socket.roomCode].isPlaying = false
        io.in(socket.roomCode).emit('usersRoomUpdated', Rooms[socket.roomCode])
        io.in(socket.roomCode).emit('gameEnded')
    })
})

Http.listen(process.env.PORT || 3000, () => {
    console.log(process.env.PORT)
})

function generateRoomCode() {
    let code = []
    let finalString = ''

    // On créer un code à 4 chiffre et on vérifie qu'il n'existe pas déjà pour une autre room
    do {
        code = [
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
        ]
    
        finalString = code.join('')
    } while (Object.keys(Rooms).includes(finalString))

    Rooms[finalString] = new Room(finalString)
    return finalString
}

function joinRoom(roomCode, nickname, socket) {
    // On ajoute le joueur à la room, on set le code de sa room et son surnom
    socket.join(roomCode)
    socket.emit('roomJoined', roomCode)
    socket.roomCode = roomCode
    if (nickname.length == 0) {
        nickname = Nickname.getNickname()
    }
    socket.nickname = nickname

    // On ajoute le joueur aux datas de la room
    Rooms[socket.roomCode].players[socket.id] = socket.nickname

    io.in(roomCode).emit('usersRoomUpdated', Rooms[roomCode])

    console.log(Rooms)

}

function leaveRoom(roomCode, socket) {
    // On supprime le joueur des datas de la room
    delete Rooms[roomCode].players[socket.id]

    io.in(roomCode).emit('usersRoomUpdated', Rooms[roomCode])

    // On check si la room a encore des joueurs. Si la room est vide, on la supprime
    if (Object.keys(Rooms[socket.roomCode].players).length <= 0) {
        delete Rooms[roomCode]
    }

    console.log(Rooms)
}

function setRoles(otherPlayersIds, word, socket) {
    io.in(socket.roomCode).emit('usersRoomUpdated', Rooms[socket.roomCode])
    const gameMaster = socket.id

    const insiderIndex = Math.floor(Math.random() * (otherPlayersIds.length - 1))

    for (let index = 0; index < otherPlayersIds.length; index++) {
        let role = {
            role : 'citoyen',
            word : ''
        }
        if (index == insiderIndex) {
            role.role = 'insider'
            role.word = word
        }

        io.in(otherPlayersIds[index]).emit('setRole', role)
    }

    io.in(gameMaster).emit('setRole', {
        role: 'master',
        word : word
    })
}