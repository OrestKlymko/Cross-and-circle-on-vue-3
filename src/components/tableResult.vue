<template>
  <div class="wrapper-table">
    <table>
      <tr>
        <th>Nickname</th>
        <th>Result</th>
      </tr>
      <tr v-for="user in users" v-bind:key="user._id">
        <td>{{ user.name }}</td>
        <td>{{ user.count }}</td>
      </tr>
    </table>
    <div class="buttons">
      <button class="custom-btn btn-1" @click="reloadPage">
        Start new game
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "tableResult",
  data: () => ({
    users: null,
  }),
  mounted() {
    axios
      .get("/usersList")
      .then((response) => {
        this.users = response.data;
      })
      .catch((e) => {
        console.log("Error:", e.message);
      });
  },

  methods: {
    reloadPage() {
      return location.reload();
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 700px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid darkgreen;
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr {
  background-color: darkseagreen;
  border: 1px solid black;
}

th {
  background-color: #04aa6d;
  color: white;
}

.custom-btn {
  min-width: 130px;
  min-height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.btn-1 {
  background: green;
  border: none;
  margin-right: 15px;
}
.btn-1:hover {
  background: darkgreen;
}
.btn-5 {
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  background: rgb(255, 27, 0);
  background: linear-gradient(
    0deg,
    rgba(255, 27, 0, 1) 0%,
    rgba(251, 75, 2, 1) 100%
  );
}
.btn-5:hover {
  color: #f0094a;
  background: white;
  box-shadow: none;
}
.btn-5:before,
.btn-5:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #f0094a;
  box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 400ms ease all;
}
.btn-5:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.btn-5:hover:before,
.btn-5:hover:after {
  width: 100%;
  transition: 800ms ease all;
}

.buttons {
  position: absolute;
  right: 45%;
  top: 80%;
}
</style>
