<template>
    <div class="section">
        <div v-if="result.result" class="box bd-grey">
            <img src="../assets/img/master.svg"/>
            <p class="role">Vous avez trouvé l'insider</p>
        </div>

        <div v-else class="box bd-grey">
            <img src="../assets/img/insider.svg"/>
            <p class="role">Perdu,
                <span v-if="result.votedFor && !result.hasEqual">vous avez voté.e.s pour {{result.votedFor.nickname}}, </span>
                <span v-else-if="result.votedFor && result.hasEqual">il y a une égalité, </span>
                {{insider.nickname}} était l'insider</p>
        </div>

        <button v-if="role.role == 'master'" @click="endGame">Fin de la partie</button>
    </div>
</template>

<script>
export default {
    computed: {
        result() {
            return this.$store.getters["socket/result"]
        },
        socket() {
            return this.$store.getters["socket/socket"]
        },
        insider() {
            return this.$store.getters["socket/insider"]
        },
        role() {
            return this.$store.getters["socket/role"]
        }
    },
    methods: {
        endGame() {
            this.socket.emit('endGame')
        },
    }
}
</script>