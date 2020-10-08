<template>
  <v-container class="mt-6">
    <v-snackbar
      class="text-center alert"
      v-model="alert.snackbar"
      color="blue-grey"
      tile
      top
    >
    {{ alert.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="light"
          text
          v-bind="attrs"
          @click="alert.snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col> 
        <v-card width="450" height="460" class="mx-auto mt-8 pa-8">
          <v-card-title class="pb-0 mt-5 mb-2">
            <h2 class="mx-auto text-uppercase">Empresa GS</h2> <br/>
            
          </v-card-title>
          <p class="mb-6 text-center grey--text">Área de RR.HH</p>
          <v-card-text class="mt-6">
            <v-form>
              <v-text-field 
              label="Email" 
              prepend-icon="mdi-account-circle"
              v-model="input.email"
              required
              />  
              <v-text-field 
              label="Password" 
              :type="showPassword ? 'text' : 'password'" 
              prepend-icon="mdi-lock" 
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
              @click:append="showPassword = !showPassword"
              v-model="input.password"
              required
              />  
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn rounded large block  color="blue-grey  white--text" 
              class="my-3 mx-auto px-12 text-uppercase" 
              @click="login"
              >Ingresar aquí
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Firebase from 'firebase'

export default {
  data: () => ({
    input: {
      email: '',
      password: '',
    },
    alert: {
      message: '',
      snackbar: false,   
    },
    showPassword: false
  }),
  
  methods: {
    login(e) {
      e.preventDefault()
      
      if (this.input.email != '' && this.input.password != '') {
        Firebase.auth().signInWithEmailAndPassword(
          this.input.email,
          this.input.password
        )
        .then(() => {
          let user = this.input.email
          this.$store.dispatch('updateUser', user)
          this.alert.snackbar = true
          this.alert.message = `Bienvenid@, ${user}`
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
          
        })
        .catch(() => {
          this.alert.snackbar = true
          this.alert.message = 'Usuario no autenticado, intente nuevamente...'
          setTimeout(() => {
            this.alert.message = ''
            this.input.email= ''
             this.input.password= ''
          }, 2000)
        }) 
      } else {
        this.alert.snackbar = true
        this.alert.message = 'Debe completar todos los campos...'
        setTimeout(() => {
             this.alert.snackbar = false
          }, 2000)
        

      }
    }
  }
};
</script>

<style lang="scss" scoped>
.alert{
  margin-top: 70px;
}
</style>