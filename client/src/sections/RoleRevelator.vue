<template>
    <div class="section">
        <div class="block card">
            <img v-if="role.role == 'master'" src="../assets/img/master.svg"/>
            <img v-else-if="role.role == 'insider'" src="../assets/img/insider.svg"/>
            <img v-else-if="role.role == 'citoyen'" src="../assets/img/citoyen.svg"/>
            <p class="role">{{$t("role." + role.role)}}</p>
        </div>
        <div v-if="['master', 'insider'].includes(role.role)">
            <p>{{$t("roleRevelator.faireDeviner")}} : </p>
            <p>{{role.word}}</p>
        </div>
        <button v-if="role.role == 'master'" @click="startChrono">{{$t("roleRevelator.commencer")}}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleMapping: {
                'master': 'MAITRE DU JEU',
                'insider': 'TRAITRE',
                'citoyen': 'CITOYEN',
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