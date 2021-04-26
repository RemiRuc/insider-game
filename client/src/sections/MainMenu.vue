<template>
    <div class="section">
        <h1>INSIDER</h1>
        <div class="block nickname">
            <p class="block-title">Ton nom</p>
            <label for="nickname">Entre un pseudo</label>
            <input name="nickname" v-model="nickname" type="text" autocomplete="off" />
        </div>
        <div class="block" :class="{'disabled': nickname.length <= 0}">
            <p class="block-title">Rejoindre une room</p>
            <label for="code">Entre un code</label>
            <input name="code" v-model="code" type="text" autocomplete="off" :disabled="nickname.length <= 0" />
            <input type="submit" value="Rejoindre" @click="joinRoom()" :disabled="nickname.length <= 0">
        </div>
        <div class="block" :class="{'disabled': nickname.length <= 0}">
            <p class="block-title">Créer une room</p>
            <input type="submit" value="Créer" @click="createRoom()" :disabled="nickname.length <= 0">
        </div>
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

<style lang="scss" scoped>
    .nickname {
        margin-bottom: 50px;
    }
</style>