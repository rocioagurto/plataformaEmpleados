<template>
  <v-app>
    
    <nav-bar :brand="'EMPRESA GS'"/>

    
     <router-view/>
  
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
    components: {
    NavBar
  },
  data: () => ({
    //
  }),
};
</script>
