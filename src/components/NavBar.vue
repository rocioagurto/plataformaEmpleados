<template>
  <div>
    <v-card
    class="mx-auto overflow-hidden"
    >
    </v-card>
    <v-app-bar
      color="blue-grey darken-4"
      dark
    >
    <router-link to="/" class="text-decoration-none grey--text text--darken-3  d-inline-flex align-center ml-3 ml-md-10" > 
      <v-toolbar-title id="title" class="white--text "> {{ brand }}</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="blue-grey lighten-5"
        >
          <v-list-item link to="/" v-if="isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-home-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Empleados</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/admin" v-if="isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Administrar</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/login" v-if="!isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-arrow-right-bold-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Iniciar sesión</v-list-item-title>
          </v-list-item>

          <v-list-item   @click="logout"  v-if="isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>

          

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Firebase from 'firebase';

export default {
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  
  methods:{
    logout() {
      Firebase.auth().signOut().then( () => {
        this.$router.push('/login')
        this.$store.dispatch('updateUser', false)
      })
    }
  },
  computed:{
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){
       return Firebase.auth().currentUser ? Firebase.auth().currentUser : ''
    }
  }

  }
</script>

