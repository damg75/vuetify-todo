<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawerApp" app :mobile-breakpoint="768">
      <v-img
        src="space.jpg"
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        class="pa-4 pt-6"
      >
        <v-avatar size="70" class="mb-2">
          <img src="avatar.jpg" alt="John Doe" />
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          Daniel Morán
        </div>
        <div class="white--text text-subtitle-2">
          damg.codes
        </div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      prominent
      :height="$route.path === '/' ? '238' : '170'"
      src="space.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="px-0" fluid>
        <v-row>
          <v-app-bar-nav-icon @click="$store.commit('TOGGLE_DRAWER', !drawerApp)"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">
            {{ $store.state.appTitle }}
          </v-toolbar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snack-bar />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  created() {
  },
  mounted() {
    this.$store.dispatch("getTasks");
  },
  components: {
    search: require("@/components/Tools/Search.vue").default,
    "live-date-time": require("@/components/Tools/LiveDateTime.vue").default,
    "field-add-task": require("@/components/Todo/FieldAddTask.vue").default,
    "snack-bar": require("@/components/Shared/SnackBar.vue").default,
  },
  computed: {
    drawerApp() {
      return this.$store.state.drawer
    }
  },
};
</script>
