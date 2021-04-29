<template>
    <div class="section">
        <div v-if="room.code" class="box bg-grey">{{$t("roomSas.codeRoom")}} : {{room.code}}</div>
        <div class="block">
            <p class="block-title">{{$t("roomSas.listeJoueurs")}}</p>
            <ul v-if="room.players">
                <li :key="i" v-for="(player, i) in room.players" class="box bd-grey">{{player.nickname}}</li>
            </ul>
        </div>
        <div class="block">
            <p class="block-title">{{$t("role.master")}} ?</p>
            <div>
                <label for="word">{{$t("roomSas.choisiMot")}}</label>
                <input type="text" name="word" v-model="word">
                <button @click="randomWord">{{$t("roomSas.motHasard")}}</button>
            </div>
            <div>
                <label for="timer">{{$t("roomSas.choisiDuree")}}</label>
                <div class="timer">
                    <p>{{$t("roomSas.minutes")}}</p>
                    <input type="number" name="timer" min="0" v-model="timer">
                </div>
            </div>
            <button @click="startGame()">{{$t("roomSas.faireDeviner")}}</button>
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
        randomWord() {
            this.socket.emit('randomWord')
        }
    },
    mounted() {
        this.socket.once('setRole', (role) => {
            this.$store.dispatch("socket/setRole", role)
            this.$emit('changeMenu', 'roleRevelator')
        })

        this.socket.on('randomWord', (word) => {
            this.word = word
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