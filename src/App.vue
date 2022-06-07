<!-- <template>
  <div id="app">
    <nav>
      <router-link to="/">Principal</router-link>
    </nav>
    <router-view/>
  </div>
</template> -->

<!-- <style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style> -->

<template>
  <v-app>
    <!-- <v-navigation-drawer app>
      <router-link to="/">Principal</router-link>
    </v-navigation-drawer> -->
    <v-app-bar app>
      <a href="/">Delzam</a> 
    </v-app-bar>
    <!-- <nav>
      <router-link to="/">Principal</router-link>
    </nav> -->
    <v-main>
      <v-container fluid>
          <router-view></router-view>
      </v-container>
    </v-main> 

    <v-footer app>
      Todos los Derechos Reservados 2002
    </v-footer>
  </v-app>
  
</template>