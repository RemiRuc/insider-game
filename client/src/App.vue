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
$white:  #cbcecb;

* {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 16px;
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
  background-color: #171817;
  text-align: center;
  color: $white;
}

.section {
  display: flex;
  flex-direction: column;

  max-width: 280px;

  margin: auto;
}

input[type=text], input[type=submit], button {
  border: none;
    border-radius: 50%;
    padding: 10px;

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

    &.bd-grey {
      border: grey 1px solid;
    }

    &.bg-grey {
      background-color: grey;

      color: white;
    }
}

ul {
  padding: 0;
  list-style: none;
}
</style>
