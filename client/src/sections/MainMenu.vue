<template>
    <div class="section">
        <h1>Insider</h1>
        <label for="nickname">Entre un pseudo</label>
        <input name="nickname" v-model="nickname" type="text" autocomplete="off" />
        <label for="code">Entre un code</label>
        <input name="code" v-model="code" type="text" autocomplete="off" />
        <input type="submit" value="Se connecter" @click="joinRoom()">
        <input type="submit" value="Ou créer en un !" @click="createRoom()">
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: '',
            nickname: '',
        }
    },
    computed: {
        socket() {
            return this.$store.getters["socket/socket"]
        },
        room() {
            return this.$store.getters["socket/room"]
        }
    },
    methods: {
        createRoom() {
            this.socket.emit('createNewRoom', this.nickname)
        },
        joinRoom() {
            this.socket.emit('joinRoom', {code: this.code, nickname: this.nickname})
        },
    },
    mounted() {
        this.socket.on('roomJoined', (codeRoom) => {
            this.$emit('changeMenu', 'room')
            console.log(codeRoom)
        })

        this.socket.on('usersRoomUpdated', (room) => {
            this.$store.dispatch("socket/setRoom", room)
            console.log(room)
        })
    }
}
</script>