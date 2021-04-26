<template>
    <div class="section">
        <p>{{minutes > 9 ? minutes : '0' + minutes}}:{{secondes > 9 ? secondes : '0' + secondes}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            minutes: 0,
            secondes: 1,
            interval: null
        }
    },
    computed: {
        socket() {
            return this.$store.getters["socket/socket"]
        }
    },
    mounted() {
        this.interval = setInterval(this.countdown, 1000)

        this.socket.once('gameEnded', () => {
            this.$emit('changeMenu', 'room')
        })
    },
    methods: {
        countdown() {
            this.secondes--
            if (this.secondes < 0) {
                this.minutes--
                this.secondes = 59
            }
            if (this.minutes < 0) {
                this.socket.emit('endGame')
                clearInterval(this.interval)
            }
        }
    }
}
</script>