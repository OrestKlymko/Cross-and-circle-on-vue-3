import { createApp } from "vue";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      users: [
        { name: "Andrew", count: 1 },
        { name: "Mike", count: 1 },
        { name: "Laky", count: 1 },
      ],
      player1: {
        name: "",
        count: 0,
      },
      player2: {
        name: "",
        count: 0,
      },
      winner: false,
    };
  },
});

const app = createApp(App);
app.use(store);
app.use(VueSweetalert2);
app.mount("#app");
