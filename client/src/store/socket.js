import io from 'socket.io-client'

export default {
    namespaced: true,
     state: {
        socket: null,
        room: {isPlaying: false},
        role: {}
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
     },
     actions: {
        async setSocket({ commit }) {
            commit('set_socket', io('http://localhost:3000'))
        },
        async setRoom({ commit }, room) {
            commit('set_room', room)
        },
        async setRole({ commit }, role) {
            commit('set_role', role)
        }
     }
}
