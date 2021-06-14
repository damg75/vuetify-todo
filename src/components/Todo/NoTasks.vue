<template>
    <div 
      class="no-tasks"
    >
      <v-icon
        size="100"
        color="primary"
      >
        mdi-check
      </v-icon>
      <div class="text-h5 primary--text">No tasks</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="sass">
  .no-tasks 
    position: absolute
    left: 35%
    top: 35%
    transform: translaste(-50%, -50%)
    opacity: 0.5
  

</style>