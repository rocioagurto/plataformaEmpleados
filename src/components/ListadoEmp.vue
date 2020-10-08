<template>
  <div class="container mb-10">
     <h1 class="text-center">Listado de Emppleados </h1>
    <v-simple-table class="mt-10">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Email</th>
          <th class="text-left">Cel</th>
          <th class="text-left">Direccion</th>
          <th class="text-left">Sitio Web</th>
          <th class="text-left">Editar</th>
          <th class="text-left">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in empleados" :key="e.id">
          <td>{{ e.username }}</td>
          <td>{{ e.email }}</td>
          <td>{{ e.phone }}</td>
          <td>
            {{ e.address.street}}
            {{ e.address.suite}}
            {{ e.address.city}}
          </td>
          <td>{{ e.website }}</td>
          <td>
          <v-btn text @click="updateEmp(e.id)" color="pink lighten-4 white--text"><v-icon>mdi-pencil</v-icon> </v-btn> 
          </td> 
          <td>
         <v-btn text @click="removePaciente(paciente.id)" color="purple lighten-4 white--text"><v-icon>mdi-delete</v-icon> </v-btn>
         </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState(['empleados']),
  },
  methods:{
     ...mapActions(['setEmps', 'setCurrentEmp', 'updateEmp'])
  },
  created() {
   this.setEmps()
  },
}
</script>
