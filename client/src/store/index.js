import Vuex from "vuex";
import SocketModule from "./socket";

export default new Vuex.Store({
  modules: {
    socket: SocketModule,
  }
});
