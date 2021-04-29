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
const WordsList = require('./words')

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

    socket.on('leaveRoom', () => {
        if (Object.keys(Rooms).includes(socket.roomCode)) {
            leaveRoom(socket.roomCode, socket)
        }
    })

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

    socket.on('startGame', (options) => {
        const otherPlayers = Object.assign({}, Rooms[socket.roomCode].players)
        delete otherPlayers[socket.id]
        const otherPlayersIds = Object.keys(otherPlayers)
        Rooms[socket.roomCode].isPlaying = true
        setRoles(otherPlayersIds, options, socket)
    })

    socket.on('randomWord', () => {
        const i = Math.floor(Math.random() * WordsList.length)
        socket.emit('randomWord', WordsList[i])
    })

    socket.on('startChrono', () => {
        io.in(socket.roomCode).emit('chronoStarted')
    })

    socket.on('findWord', () => {
        Rooms[socket.roomCode].players[socket.id].finded = true
        io.in(socket.roomCode).emit('usersRoomUpdated', Rooms[socket.roomCode])
        io.in(socket.roomCode).emit('wordFinded')
    })

    socket.on('hasVote', (vote) => {
        Rooms[socket.roomCode].votes.push(vote)
        // On regarde si tout le monde a voté
        const numberOfVoter = Object.keys(Rooms[socket.roomCode].players).length - 1
        if (Rooms[socket.roomCode].votes.length >= numberOfVoter) {
            // On calcul le nombre de vote disant que la personne est traitre
            let result = 0
            for (let index = 0; index < Rooms[socket.roomCode].votes.length; index++) {
                if (Rooms[socket.roomCode].votes[index]) {
                    result++
                }
            }

            if (result > Rooms[socket.roomCode].votes.length / 2) {
                // Si plus de la moitié on répondu oui
                io.in(socket.roomCode).emit('isInsider', checkIfFinderIsInsider(socket))
            } else {
                io.in(socket.roomCode).emit('isNotInsider')
            }
        }
    })

    socket.on('hasVotePlayer', (vote) => {
        Rooms[socket.roomCode].votesPlayers.push(vote)
        const numberOfVoter = Object.keys(Rooms[socket.roomCode].players).length
        if (Rooms[socket.roomCode].votesPlayers.length >= numberOfVoter) {
            // Compte le nombre de vote pour chaque pesonne
            var counts = {};
            Rooms[socket.roomCode].votesPlayers.forEach((x) => { counts[x] = (counts[x] || 0)+1; });

            const keys = Object.keys(counts)

            // Check qui a le plus de nombre de vote
            let premier = {id: null, count: 0}
            let premierHasEqual = false

            for (let i = 0; i < keys.length; i++) {
                if (i = 0) {
                    premier = {id: keys[i], count: counts[keys[i]]}
                } else {
                    if (counts[keys[i]] > premier.count) {
                        // Si le premier se fait dépasser
                        premier = {id: keys[i], count: counts[keys[i]]}
                        premierHasEqual = false
                    } else if (counts[keys[i]] == premier.count) {
                        // Si le premier a une égalité
                        premierHasEqual = true
                    }
                }
            }

            const result = {
                votedFor : Rooms[socket.roomCode].players[premier.id],
                hasEqual : premierHasEqual,
                result : Rooms[socket.roomCode].players[premier.id].role == 'insider'
            }
            
            io.in(socket.roomCode).emit('insiderIs', result)
        }
    })

    socket.on('endGame', () => {
        console.log("endGame")
        let playersIds = Object.keys(Rooms[socket.roomCode].players)
        for (let i = 0; i < playersIds.length; i++) {
            console.log(Rooms[socket.roomCode].players[playersIds[i]])
            Rooms[socket.roomCode].players[playersIds[i]].role = null
            Rooms[socket.roomCode].players[playersIds[i]].vote = null
            Rooms[socket.roomCode].players[playersIds[i]].finded = false
            Rooms[socket.roomCode].votes = []
            Rooms[socket.roomCode].votesPlayers = []
        }
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
    Rooms[socket.roomCode].players[socket.id] = {
        nickname: socket.nickname,
        role: null,
        vote: null
    }

    io.in(roomCode).emit('usersRoomUpdated', Rooms[roomCode])

    console.log(Rooms)

}

function leaveRoom(roomCode, socket) {
    // On supprime le joueur des datas de la room
    delete Rooms[roomCode].players[socket.id]

    io.in(roomCode).emit('usersRoomUpdated', Rooms[roomCode])

    // On check si la room a encore des joueurs. Si la room est vide, on la supprime
    if (Rooms[socket.roomCode]) {
        if (Object.keys(Rooms[socket.roomCode].players).length <= 0) {
            delete Rooms[roomCode]
        }
    }

    console.log(Rooms)
}

function setRoles(otherPlayersIds, options, socket) {
    if (options.timer < 0 || options.timer > 15) {
        options.timer = 5
    }

    io.in(socket.roomCode).emit('usersRoomUpdated', Rooms[socket.roomCode])
    const gameMaster = socket.id

    const insiderIndex = Math.floor(Math.random() * (otherPlayersIds.length - 1))

    for (let index = 0; index < otherPlayersIds.length; index++) {
        let role = {
            role : 'citoyen',
            word : '',
            timer : options.timer
        }
        if (index == insiderIndex) {
            role.role = 'insider'
            role.word = options.word
        }

        Rooms[socket.roomCode].players[otherPlayersIds[index]].role = role.role
        io.in(otherPlayersIds[index]).emit('setRole', role)
    }

    Rooms[socket.roomCode].players[socket.id].role = 'master'
    io.in(gameMaster).emit('setRole', {
        role: 'master',
        word : options.word,
        timer : options.timer
    })

    io.in(socket.roomCode).emit('usersRoomUpdated', Rooms[socket.roomCode])
}

function checkIfFinderIsInsider(socket) {
    const keys = Object.keys(Rooms[socket.roomCode].players)
    for (let index = 0; index < keys.length; index++) {
        const role = Rooms[socket.roomCode].players[keys[index]].role
        const finded = Rooms[socket.roomCode].players[keys[index]].finded
        
        if (finded) {
            if (role == 'insider') {
                return {
                    votedFor : null,
                    hasEqual : null,
                    result : true
                }
            } else {
                return {
                    votedFor : null,
                    hasEqual : null,
                    result : false
                }
            }
        }
    }
}