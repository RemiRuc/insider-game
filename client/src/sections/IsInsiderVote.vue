<template>
    <div class="section">
        <div class="block card">
            <img src="../assets/img/master.svg"/>
            <p v-if="finder" class="role">{{finder.nickname}} {{$t("vote.trouveMot")}}</p>
        </div>
        <div v-if="!hasVote && !role.finded" class="block">
            <p class="block-title">{{$t("vote.estTElleTraitre")}}</p>
            <button @click="vote(true)">{{$t("vote.oui")}}</button>
            <button @click="vote(false)">{{$t("vote.non")}}</button>
        </div>
        <div v-else class="box bd-grey">
            {{$t("vote.attente")}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hasVote : false
        }
    },
    computed: {
        socket() {
            return this.$store.getters["socket/socket"]
        },
        room() {
            return this.$store.getters["socket/room"]
        },
        role() {
            return this.$store.getters["socket/role"]
        },
        finder() {
            return this.$store.getters["socket/finder"]
        }
    },
    mounted() {
        this.socket.once('isNotInsider', () => {
            this.$emit('changeMenu', 'whoIsInsiderVote')
        })

        this.socket.once('isInsider', (result) => {
            this.$store.dispatch("socket/setResult", result)
            console.log(result)
            this.$emit('changeMenu', 'result')
        })
    },
    methods: {
        vote(isInsider) {
            this.hasVote = true
            this.socket.emit('hasVote', isInsider)
        },
    },
}
</script>