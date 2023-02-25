<template>
  <div class="form-style-6" v-show="startGame == false">
    <h1 class="head-name">Cross the circle</h1>
    <form>
      <div class="player">Player on <strong>'X'</strong></div>
      <input
        type="text"
        name="field1"
        v-model="$store.state.player1.name"
        placeholder="Input your nickname"
      />
      <div class="name-who-start" v-show="$store.state.player1.name.length > 4">
        {{ $store.state.player1.name }} will start this game with 'X'
      </div>

      <div class="player">Player on <strong>'O'</strong></div>
      <input
        type="text"
        name="field2"
        v-model="$store.state.player2.name"
        placeholder="Input your nickname"
      />

      <button @click.prevent="isStartGame" type="submit">Let's start</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "formUserInput",
  data: () => ({
    startGame: false,
  }),
  methods: {
    isStartGame() {
      if (
        this.$store.state.player1.name.length < 4 ||
        this.$store.state.player2.name.length < 4
      ) {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Length of name should be greather than 4 symbols",
        });
      } else if (
        this.$store.state.player1.name == this.$store.state.player2.name
      ) {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Players names can not be equals",
        });
      } else {
        this.startGame = true;
        this.$emit("isStartGame", this.startGame);
      }
    },
  },
};
</script>

<style scoped>
.form-style-6 {
  font: 95% Arial, Helvetica, sans-serif;
  min-width: 600px;
  margin: auto;
  padding: 16px;
  background: #f7f7f7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form-style-6 h1 {
  background: #43d1af;
  padding: 20px 0;
  font-size: 140%;
  font-weight: 300;
  text-align: center;
  color: #fff;
  margin: -16px -16px 16px -16px;
}
.form-style-6 input[type="text"],
.form-style-6 textarea,
.form-style-6 select {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  outline: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  background: #fff;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 3%;
  color: #555;
  font: 95% Arial, Helvetica, sans-serif;
}
.form-style-6 input[type="text"]:focus,
.form-style-6 textarea:focus,
.form-style-6 select:focus {
  box-shadow: 0 0 5px #43d1af;
  padding: 3%;
  border: 1px solid #43d1af;
}

.form-style-6 button {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  padding: 3%;
  background: #43d1af;
  border-bottom: 2px solid #30c29e;
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  color: #fff;
}
.form-style-6 button:hover {
  background: #2ebc99;
}

.head-name {
  padding: 10px 20px;
}

.name-who-start {
  padding-bottom: 15px;
  padding-top: 15px;
  text-align: center;
  font-weight: 700;
}

.player {
  padding-bottom: 15px;
  padding-top: 15px;
}
</style>
