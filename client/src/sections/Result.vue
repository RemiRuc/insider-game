<template>
    <div class="section">
        <div v-if="result.result" class="box bd-grey">
            <img src="../assets/img/master.svg"/>
            <p class="role">{{$t("result.insiderTrouve")}}</p>
        </div>

        <div v-else class="box bd-grey">
            <img src="../assets/img/insider.svg"/>
            <p class="role">{{$t("result.perdu")}},
                <span v-if="result.votedFor && !result.hasEqual">{{$t("result.votePour")}} {{result.votedFor.nickname}}, </span>
                <span v-else-if="result.votedFor && result.hasEqual">{{$t("result.egalite")}}, </span>
                {{$t("result.result", {insider: insider.nickname})}}</p>
        </div>

        <button v-if="role.role == 'master'" @click="endGame">{{$t("chrono.finDuJeu")}}</button>
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