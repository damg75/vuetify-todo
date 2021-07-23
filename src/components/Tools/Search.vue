<template>
    <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = !searchClosed"
    @blur="searchClosed = !searchClosed"
    :disabled="$store.state.sorting"
    class="mt-1 expanding-search"
    :class="{ 'closed' : searchClosed && !$store.state.search }"
    placeholder="Search"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
    ></v-text-field>
</template>
<script>
export default {
    data() {
        return {
            searchClosed: true
        }
    }
    
}
</script>
<style lang="sass">
    .expanding-search
        transition: max-width 0.3s
        .v-input__slot
            cursor: pointer !important
            &:before, &:after
                    border-color: transparent !important
        &.closed 
            max-width: 45px
            .v-input__slot
                background: transparent !important
</style>

