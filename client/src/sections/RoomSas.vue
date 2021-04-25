<template>
    <div class="section">
        <div v-if="room.code" class="box bg-grey">Code de la room : {{room.code}}</div>
        <ul v-if="room.players">
            <li :key="i" v-for="(player, i) in room.players" class="box bd-grey">{{player}}</li>
        </ul>
        <button @click="startGame()">C'est moi qui fait deviner !</button>
    </div>
</template>

<script>
export default {
    computed: {
        socket() {
            return this.$store.getters["socket/socket"]
        },
        room() {
            return this.$store.getters["socket/room"]
        }
    },
    methods: {
        startGame() {
            this.socket.emit('startGame')
        },
    },
    mounted() {
        this.socket.on('usersRoomUpdated', (room) => {
            this.$store.dispatch("socket/setRoom", room)
        })

        this.socket.on('setRole', (role) => {
            this.$store.dispatch("socket/setRole", role)
            this.$emit('changeMenu', 'roleRevelator')
        })
    }
}
</script>