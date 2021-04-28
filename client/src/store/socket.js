import io from 'socket.io-client'

export default {
    namespaced: true,
     state: {
        socket: null,
        room: {isPlaying: false},
        role: {},
        result: {
            votedFor : null,
            hasEqual : null,
            result : false
        }
     },
     getters: {
        socket(state) {
            return state.socket
        },
        room(state) {
            return state.room
        },
        role(state) {
            return state.role
        },
        finder(state) {
            const keys = Object.keys(state.room.players)
            console.log(keys.length)
            for (let index = 0; index < keys.length; index++) {
                console.log(state.room.players[keys[index]])
                if (state.room.players[keys[index]].finded) {
                    return state.room.players[keys[index]]
                }
            }
        },
        insider(state) {
            const keys = Object.keys(state.room.players)
            console.log(keys.length)
            for (let index = 0; index < keys.length; index++) {
                console.log(state.room.players[keys[index]])
                if (state.room.players[keys[index]].role == 'insider') {
                    return state.room.players[keys[index]]
                }
            }
        },
        result(state) {
            return state.result
        }
     },
     mutations: {
        ['set_socket'](state, socket) {
            state.socket = socket
        },
        ['set_room'](state, room) {
            state.room = room
        },
        ['set_role'](state, role) {
            state.role = role
        },
        ['set_result'](state, result) {
            state.result = result
        },
     },
     actions: {
        async setSocket({ commit }) {
            commit('set_socket', io(process.env.VUE_APP_URL))
        },
        async setRoom({ commit }, room) {
            commit('set_room', room)
        },
        async setRole({ commit }, role) {
            commit('set_role', role)
        },
        async setResult({ commit }, result) {
            commit('set_result', result)
        }
     }
}
