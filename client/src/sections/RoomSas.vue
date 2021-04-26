<template>
    <div class="section">
        <div v-if="room.code" class="box bg-grey">Code de la room : {{room.code}}</div>
        <ul v-if="room.players">
            <li :key="i" v-for="(player, i) in room.players" class="box bd-grey">{{player}}</li>
        </ul>
        <label for="word">Choisi un mot</label>
        <input type="text" name="word" v-model="word">
        <button @click="startGame()">C'est moi qui fait deviner !</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            word: ''
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
        startGame() {
            this.socket.emit('startGame', this.word)
        },
    },
    mounted() {
        this.socket.once('setRole', (role) => {
            this.$store.dispatch("socket/setRole", role)
            this.$emit('changeMenu', 'roleRevelator')
        })
    }
}
</script>