<template>
  <v-btn
    @click="doneTaskSorting"
    color="primary"
    class="button-done-sorting"
  >
      Done Sorting
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    doneTaskSorting() {
      this.$store.commit('toggleSorting')
      this.$store.commit('showSnackBar', `Tasks reordered!`)
    }
  }

}
</script>

<style lang="sass">
    .button-done-sorting
        position: fixed
        bottom: 20px
        left: 50%
        transform: translateX(-50%)

</style>