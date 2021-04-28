<template>
    <div class="section">
        <div v-if="!hasVote" class="block">
            <p class="block-title">Liste des joueurs</p>
            <ul v-if="room.players">
                <li :key="i" v-for="(player, key, i) in room.players" class="box bd-grey">
                    <span v-if="player.role == 'master' || player.finded">{{player.nickname}}</span>
                    <button v-else @click="vote(key)">{{player.nickname}}</button>
                </li>
            </ul>
        </div>
        <div v-else class="box bd-grey">
            En attente des autres joueurs
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
            this.socket.once('insiderIs', (result) => {
            this.$store.dispatch("socket/setResult", result)
            console.log(result)
            this.$emit('changeMenu', 'result')
            })
        },
        methods: {
            vote(id) {
                this.hasVote = true
                this.socket.emit('hasVotePlayer', id)
            },
        },
    }
</script>