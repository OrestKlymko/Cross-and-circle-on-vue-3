<template>
  <div v-if="this.$store.state.winner">
    {{ showAlert() }}
  </div>
  <table-result v-if="tableResult" />
</template>

<script>
import TableResult from "@/components/tableResult.vue";

export default {
  name: "winnerPopup",
  components: { TableResult },
  data: () => ({
    tableResult: false,
  }),
  props: {
    winner: {
      type: Boolean,
      required: true,
      default: true,
    },
    whoWins: {
      type: String,
    },
  },
  methods: {
    showAlert() {
      this.$swal
        .fire({
          title: `Winner is ${this.whoWins}`,
          showDenyButton: true,
          confirmButtonText: "New game",
          denyButtonText: `Table results`,
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            location.reload();
          } else if (result.isDenied) {
            this.$emit("showAlert");
            this.tableResult = true;
            this.$store.state.winner = false;
          }
        });
    },
  },
};
</script>

<style scoped></style>
