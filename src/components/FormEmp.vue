<template>
<div class="text-center">
   <h1 class="mt-5">Ingreso Perfil </h1>
<v-container class="container" >
      <v-row>
        <v-col>
          <v-form width="300" >
           <v-text-field label="Nombre" type="text" :value="currentEmp.data.name" @input="updateName"/>
                <v-text-field label="Email" type="text" :value="currentEmp.data.email" @input="updateEmail"/>
                <v-text-field label="Cel" type="text" :value="currentEmp.data.cel" @input="updateCel"/>
                <v-text-field label="Direccion" type="text" :value="currentEmp.data.direccion" @input="updateDireccion"/>
                 <v-text-field label="Sitio Web" type="text" :value="currentEmp.data.sitioWeb" @input="updateSitioWeb"/>
             <v-card-actions> 
       <v-btn rounded depressed class="mb-5 mx-auto px-6" color="blue-grey darken-4 white--text" @click="submitForm"> {{ !!currentEmp.id ? 'Actualizar':'Agregar Perfil'}} </v-btn>
      </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
computed:{
  ...mapState(['currentEmp'])
},
methods: {
  ...mapActions(['updateName', 'updateEmail', 'updateCel', 'postEmp', 'updateDireccion', 'updateSitioWeb', 'updateEmp']),
  submitForm(){
    if(this.currentEmp.id){
      this.updateEmp(this.currentEmp.id)
    }else{
      this.postEmp()
    }
  }
},
}
</script>

<style>

</style>