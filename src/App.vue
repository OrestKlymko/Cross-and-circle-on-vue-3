<template>
  <div class="wave"></div>
  <form-user-input @isStartGame="isStartGame($event)" />
  <div class="main-wrapper">
    <transition>
      <div class="all" v-show="startGame == true">
        <div class="wrapper">
          <div
            class="cells"
            v-for="(item, index) in cells"
            :key="index"
            @click="clickOnItem(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </transition>
  </div>
  <winner-popup :who-wins="whoWins" @showAlert="isStartGame($event)" />
</template>

<script>
import isWinner from "@/components/calculate/calculate-winner-crossorcircle";
import FormUserInput from "@/components/formUserInput.vue";
import WinnerPopup from "@/components/winnerPopup.vue";

export default {
  components: { WinnerPopup, FormUserInput },
  data: () => ({
    cells: [null, null, null, null, null, null, null, null, null],
    cross: "x",
    circle: "o",
    size: 0,
    controlArrayCross: [],
    controlArrayCircle: [],
    whoWins: "",
    startGame: false,
    winnerCombination: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
  }),
  methods: {
    clickOnItem(index) {
      if (this.cells[index] !== null) {
        return;
      }

      if (this.size % 2 !== 0) {
        this.cells[index] = this.circle;
        this.size++;
        this.controlArrayCircle.push(index);
        if (this.controlArrayCircle.length >= 3) {
          if (isWinner(this.controlArrayCircle, this.winnerCombination)) {
            this.$store.state.winner = true;
            this.whoWins = this.$store.state.player2.name;
            this.$store.state.player2.count++;
            this.$store.state.users.push(this.$store.state.player1);
            this.$store.state.users.push(this.$store.state.player2);
          }
        }
      } else {
        this.cells[index] = this.cross;
        this.size++;
        this.controlArrayCross.push(index);
        if (this.controlArrayCross.length >= 3) {
          if (isWinner(this.controlArrayCross, this.winnerCombination)) {
            this.$store.state.winner = true;
            this.whoWins = this.$store.state.player1.name;
            this.$store.state.player1.count++;
            this.$store.state.users.push(this.$store.state.player1);
            this.$store.state.users.push(this.$store.state.player2);
          }
        }
      }
      if (!this.cells.includes(null)) {
        this.$swal
          .fire({
            icon: "info",
            title: "Draw",
            text: "You can play once more",
            confirmButtonText: "Go",
          })
          .then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        this.$store.state.users.push(this.$store.state.player1);
        this.$store.state.users.push(this.$store.state.player2);
      }
    },

    isStartGame(data) {
      this.startGame = data;
    },
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.wrapper * {
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid rgb(24, 84, 133);
  text-align: center;
  font-size: 90px;
  font-family: sans-serif;
  color: black;
}

.wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 200px 200px 200px;
  grid-gap: 20px;
}
.main-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

body {
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: auto;
  background: linear-gradient(
    315deg,
    rgba(101, 0, 94, 1) 3%,
    rgba(60, 132, 206, 1) 38%,
    rgba(48, 238, 226, 1) 68%,
    rgba(255, 25, 25, 1) 98%
  );
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
  background-attachment: fixed;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.wave {
  background: rgb(255 255 255 / 25%);
  border-radius: 1000% 1000% 0 0;
  position: fixed;
  width: 200%;
  height: 12em;
  animation: wave 10s -3s linear infinite;
  transform: translate3d(0, 0, 0);
  opacity: 0.8;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.wave:nth-of-type(2) {
  bottom: -1.25em;
  animation: wave 18s linear reverse infinite;
  opacity: 0.8;
}

.wave:nth-of-type(3) {
  bottom: -2.5em;
  animation: wave 20s -1s reverse infinite;
  opacity: 0.9;
}

@keyframes wave {
  2% {
    transform: translateX(1);
  }

  25% {
    transform: translateX(-25%);
  }

  50% {
    transform: translateX(-50%);
  }

  75% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(1);
  }
}
</style>
