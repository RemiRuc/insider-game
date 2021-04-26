<template>
  <transition name="fade" mode="out-in">
  <MainMenu key="1" v-if="room.isPlaying == false && menu == 'home'" @changeMenu="changeMenu" />
  <RoomSas key="2" v-else-if="room.isPlaying == false && menu == 'room'" @changeMenu="changeMenu"/>
  <RoleRevelator key="3" v-else-if="room.isPlaying && menu == 'roleRevelator'" @changeMenu="changeMenu"/>
  <Chrono key="4" v-else-if="room.isPlaying && menu == 'chrono'" @changeMenu="changeMenu" />
  </transition>

  <MyFooter/>
</template>

<script>
import MainMenu from '../sections/MainMenu'
import RoomSas from '../sections/RoomSas'
import RoleRevelator from '../sections/RoleRevelator'
import Chrono from '../sections/Chrono'

import MyFooter from './MyFooter'

export default {
  components: { MainMenu, RoomSas, RoleRevelator, Chrono, MyFooter },
  data() {
    return {
      menu : 'home'
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
    changeMenu(menu) {
      console.log(menu, this.room)
      this.menu = menu
    }
  },
  mounted() {
    window.addEventListener('beforeunload', () => {
      this.socket.emit('leaveRoom')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
