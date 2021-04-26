<template>
  <Home />
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  created() {
    this.$store.dispatch("socket/setSocket")
  }
}
</script>

<style lang="scss">
@font-face {
 font-family: "PaytoneOne";
 src: url("./assets/paytone/PaytoneOne-Regular.ttf");
}

$white:  #cbcecb;
$bg-color: #171817;

* {
  box-sizing: border-box;
  font-family: "PaytoneOne", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 20px;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $bg-color;
  text-align: center;
  color: $white;
}

.section {
  display: flex;
  flex-direction: column;

  max-width: 280px;

  margin: auto;
}

input[type=text], input[type=submit], input[type=number],button {
    width: 100%;

    border: none;
    border-radius: 50%;
    padding: 10px;
    margin: 7px 0;

    font-size: 1rem;

    transition: border-radius .5s;
    &:focus {
      border-radius: 25%;
    }
}

input[type=submit], button {
  background-color: red;
  color: $white;

  cursor: pointer;

  &:hover {
    border-radius: 25%;
  }
}

.box {
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;

    &.bd-grey {
      border: grey 1px solid;
    }

    &.bg-grey {
      background-color: grey;

      color: white;
    }
}

.block {
    position: relative;
    border-radius: 5px;
    border: grey 1px solid;
    padding: 10px;
    margin: 10px 0px;

    transition: .5s;

    .block-title {
      position: absolute;
      display: table;
      top: -11px;
      left: 50%;
      width: fit-content;

      padding: 0 10px;
      margin: 0 auto;

      font-size: 0.9rem;
      background: $bg-color;
      transform: translateX(-50%);
    }

    &.card {
          width: 160px;
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: auto;

        .role {
          font-size: 1.9rem;
          line-height: 1.9rem;
        }
    }

    &.disabled {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }
}

ul {
  padding: 0;
  list-style: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
