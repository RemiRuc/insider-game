<template>
    <div class="section">
        <p class="box bg-grey">Tu es : {{roleMapping[role.role]}}</p>
        <p v-if="['master', 'insider'].includes(role.role)">Voici le mot à faire deviner : {{role.word}}</p>
        <button v-if="role.role == 'master'" @click="startChrono">Commencer</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleMapping: {
                'master': 'Maitre du jeu',
                'insider': 'Infiltré',
                'citoyen': 'Citoyen',
            }
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
        }
    },
    mounted() {
        this.socket.once('chronoStarted', () => {
            this.$emit('changeMenu', 'chrono')
        })
    },
    methods: {
        startChrono() {
            this.socket.emit('startChrono')
        }
    }
}
</script>