<template>
    <div class="section">
        <div v-if="room.code" class="box bg-grey">Code de la room : {{room.code}}</div>
        <div class="block">
            <p class="block-title">Liste des joueurs</p>
            <ul v-if="room.players">
                <li :key="i" v-for="(player, i) in room.players" class="box bd-grey">{{player}}</li>
            </ul>
        </div>
        <div class="block">
            <p class="block-title">Maitre du jeu ?</p>
            <label for="word">Choisi un mot</label>
            <input type="text" name="word" v-model="word">
            <label for="timer">Choisi la durée</label>
            <div class="timer">
                <p>minutes</p>
                <input type="number" name="timer" min="0" v-model="timer">
            </div>
            <button @click="startGame()">C'est moi qui fait deviner !</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            word: '',
            timer: 5
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
            this.socket.emit('startGame', {word: this.word, timer: this.timer})
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

<style lang="scss" scoped>
    .timer {
        position: relative;

        p {
            position: absolute;
            top: 50%;
            left: 13%;
            margin: 0;
            font-size: 1rem;
            color: black;
            transform: translateY(-55%);
        }
    }
</style>