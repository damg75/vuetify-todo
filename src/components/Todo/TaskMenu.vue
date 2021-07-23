<template>
    <div>
        <v-menu
        bottom
        left
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            icon
            color="primary"
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="handleClick(index)"
            >
            <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
        <dialog-delete
          :task="task"
          @close="dialogs.delete = false"
          v-if="dialogs.delete"
        />
        <dialog-due-date
          :task="task"
          @close="dialogs.dueDate = false"
          v-if="dialogs.dueDate"
        />
        <dialog-edit
          :task="task"
          @close="dialogs.edit = false"
          v-if="dialogs.edit"
        />
    </div>
</template>

<script>
import DialogDueDate from './Dialogs/DialogDueDate.vue'
export default {
    props: ['task'],
    data: () => ({
        dialogs: {
            delete: false,
            dueDate: false,
            edit: false
        },
        items: [
            { 
                title: 'Edit',
                icon: 'mdi-pencil',
                click() {
                    this.dialogs.edit = true
                }
            },
            { 
                title: 'Due date',
                icon: 'mdi-calendar',
                click() {
                    this.dialogs.dueDate = true
                }
            },
            { 
                title: 'Delete',
                icon: 'mdi-delete',
                click() {
                    this.dialogs.delete = true
                }
            },
            { 
                title: 'Sort',
                icon: 'mdi-drag-horizontal-variant',
                click() {
                    if (!this.$store.state.search) {
                        this.$store.commit('toggleSorting')
                    } 
                    else {
                        this.$store.commit('showSnackbar', `You cannot sort while searching!`)
                    }
                }
            },
        ],
    }),
    methods: {
        handleClick(index) {
            this.items[index].click.call(this)
        }
    },
    components: {
        'dialog-delete': require('@/components/Todo/Dialogs/DialogDelete.vue').default,
        'dialog-edit': require('@/components/Todo/Dialogs/DialogEdit.vue').default,
        'dialog-due-date': require('@/components/Todo/Dialogs/DialogDueDate.vue').default


    }
}
</script>

<style>

</style>