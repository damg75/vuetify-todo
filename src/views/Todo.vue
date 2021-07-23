<template>
  <div class="home">

    <field-add-task />
    <list-tasks 
      v-if="$store.state.tasks.length"
    />
    <no-tasks
     v-else 
    />
    <button-done-sorting 
      v-if="$store.state.sorting"
    />
  </div>
</template>

<script>
  // import FieldAddTask from '@/components/Todo/FieldAddTask.vue'

  export default {
    name: 'Home',
    components: {
      'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
      'list-tasks': require('@/components/Todo/ListTasks.vue').default,
      'no-tasks': require('@/components/Todo/NoTasks.vue').default,
      'button-done-sorting': require('@/components/Todo/ButtonDoneSorting.vue').default
    }
  }
</script>

<style lang="sass">

</style>
