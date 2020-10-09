<template>
  <div class="text-center">
      <v-container class="container" >
        <v-row>
          <v-col>
            <v-form @submit.prevent="addPerfil()" v-if="!editar">
              <h1 class="mt-5">Ingresar Perfil </h1>
              <v-text-field label="Nombre" type="text" :value="currentEmp.data.username" @input="updateName" single-line/>
              <v-text-field label="Email" type="text" :value="currentEmp.data.email" @input="updateEmail" single-line/>
              <v-text-field label="Cel" type="text" :value="currentEmp.data.phone" @input="updateCel" single-line/>
              <v-text-field label="Ciudad" type="text" :value="currentEmp.data.address.city" @input="updateCiudad" single-line/>
              <v-text-field label="Sitio Web" type="text" :value="currentEmp.data.website" @input="updateSitioWeb" single-line/>
            <v-card-actions> 
              <v-btn rounded depressed class="mb-5 mx-auto px-6" color="blue-grey darken-4 white--text" type="submit"> Agregar Perfil </v-btn>
            </v-card-actions>
          </v-form>
          <v-form @submit.prevent="updateEmp(editAct)" v-if="editar" >
            <h1 class="mt-5">Editar Perfil </h1>
              <v-text-field label="Nombre" type="text" :value="actEdit.username" @input="updateName" single-line/>
              <v-text-field label="Email" type="text" :value="actEdit.email" @input="updateEmail" single-line/>
              <v-text-field label="Cel" type="text" :value="actEdit.phone" @input="updateCel" single-line/>
              <v-text-field label="Ciudad" type="text" :value="actEdit.address.city" @input="updateCiudad" single-line/>
              <v-text-field label="Sitio Web" type="text" :value="actEdit.website" @input="updateSitioWeb" single-line/>
            <v-card-actions class="justify-center"> 
              <v-btn rounded depressed class="mb-5  px-6" color="blue-grey darken-1 white--text" type="submit"> Actualizar perfil </v-btn>
              <v-btn rounded depressed class="mb-5 px-6" color="blue-grey darken-4 white--text" type="submit" @click="editar = false"> Cancelar </v-btn>
            </v-card-actions>
          </v-form>
          <div class="container mb-10">
            <h1 class="text-center">Listado de Emppleados </h1>
            <v-simple-table class="mt-10">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nombre</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Cel</th>
                  <th class="text-left">Ciudad</th>
                  <th class="text-left">Sitio Web</th>
                  <th class="text-left">Editar</th>
                  <th class="text-left">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(e, index) in empleados" :key="index">
                  <td>{{ e.username }}</td>
                  <td>{{ e.email }}</td>
                  <td>{{ e.phone }}</td>
                  <td>
                    {{ e.address.city}}
                  </td>
                  <td>{{ e.website }}</td>
                  <td>
                  <v-btn text @click="editEmp(e.id)" color="blue-grey darken-1  white--text"><v-icon>mdi-pencil</v-icon> </v-btn> 
                  </td> 
                  <td>
                <v-btn text @click="removeEmp(e.id)" color="blue-grey darken-4  white--text"><v-icon>mdi-delete</v-icon> </v-btn>
                </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data(){
    return{
    editar:false
    }
  },
  computed:{
  ...mapState(['currentEmp', 'empleados', 'actEdit'])
},
  methods: {
  ...mapActions(['updateName', 'updateEmail', 'updateCel', 'postEmp', 'updateCiudad', 'updateSitioWeb', 'updateEmp', 'deleteEmp', 'setCurrentEmp', 'setEmps']),
  
  addPerfil(){
    this.postEmp()
  },
  updateEmp(item){
   this.updateEmp(item)
  },

  editEmp(id){
    this.editar= true
    this.setCurrentEmp(id)
   console.log(id)
    },
    removeEmp(id){
      let confirmation = confirm('¿Estás seguro(a) que deseas eliminar a este empleado?')
      if(confirmation){
        this.deleteEmp(id)
        console.log(id)
      }
    },
 },
 created() {
    this.setEmps()
  }
}
</script>

<style>

</style>