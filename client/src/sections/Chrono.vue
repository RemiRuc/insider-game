<template>
    <div class="section">
        <p>{{minutes > 9 ? minutes : '0' + minutes}}:{{secondes > 9 ? secondes : '0' + secondes}}</p>
        <button v-if="role.role == 'master'" @click="endGame">{{$t("chrono.finDuJeu")}}</button>
        <button v-else @click="findWord">{{$t("chrono.trouve")}}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            minutes: 5,
            secondes: 0,
            interval: null
        }
    },
    computed: {
        socket() {
            return this.$store.getters["socket/socket"]
        },
        role() {
            return this.$store.getters["socket/role"]
        }
    },
    mounted() {
        this.minutes = parseInt(this.role.timer)
        this.secondes = 0
        this.interval = setInterval(this.countdown, 1000)

        this.socket.once('gameEnded', () => {
            this.$emit('changeMenu', 'room')
        })

        this.socket.once('wordFinded', () => {
            this.$emit('changeMenu', 'isInsiderVote')
        })
    },
    methods: {
        countdown() {
            this.secondes--
            if (this.secondes < 0) {
                this.minutes--
                this.secondes = 59
            }
            if (this.minutes < 0 && this.role.role == "master") {
                this.endGame()
            }
        },
        endGame() {
            this.socket.emit('endGame')
            clearInterval(this.interval)
        },
        findWord() {
            this.role.finded = true
            this.socket.emit('findWord')
            clearInterval(this.interval)
        }
    }
}
</script>