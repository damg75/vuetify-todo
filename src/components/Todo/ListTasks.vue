<template>
    <v-list
      v-if="$store.state.tasks"
      class="pt-0"
      flat
    >
        <draggable
            v-model="tasks"
            handle=".handle"
        >
            <task 
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </draggable>

    </v-list>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    computed: {
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                this.$store.commit('setTasks', value)
            }
        }
    },
    components: {
        'task': require('@/components/Todo/Task.vue').default,
        draggable
    }
}
</script>

<style>

</style>