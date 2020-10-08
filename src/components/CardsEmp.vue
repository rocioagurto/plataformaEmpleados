<template>
  <v-container>
    <v-row >
      <v-col cols="12" sm="6" lg="4" v-for="empleado in empleados" :key="empleado.id" >
        <v-card
          class="mx-auto pa-6 d-flex align-items-center"
          min-width="300"
          color="blue-grey lighten-4"
        >   
          <v-row>
            <v-card-title class="text-uppercase">
              {{empleado.username}}
            </v-card-title>
            <v-card-text>
              <b>Email:</b> {{empleado.email}} <br>
              <b> Cel: </b> {{empleado.phone}}<br>
              <b>Dirección:</b>
              {{empleado.address.street}},
              {{empleado.address.suite}},
              {{empleado.address.city}}.<br>
              <b> Sitio Web: </b>{{empleado.website}}
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState(['empleados']),
  },
  methods:{
     ...mapActions(['setEmps', 'setCurrentEmp'])
  },
  created() {
   this.setEmps()
  },
}
</script>

