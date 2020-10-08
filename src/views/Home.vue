<template>
  <v-container class="home">
      <h1 class="text-uppercase text-center pa-12 blue-grey darken-3 white--text ">Empleados gs</h1>
    <cards-emp/>
  </v-container>
</template>

<script>
import CardsEmp from '../components/CardsEmp'


export default {
  name: 'Home',
  components: {
    CardsEmp,
  }
 
}


</script>
