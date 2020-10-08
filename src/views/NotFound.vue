<template>
  <div class="text-center">
    <v-img :src="apod.url" min-height=100vh >
      <v-row class="col ">
        <v-col cols="12">
         <p class="titulo  mt-16">404</p>
          <h2> Not found</h2>
      <p >The requested URL was not found on this server.</p>
      <v-btn
           
            id="btn1"
            fab dark large
            @click="expand = !expand"
            class=" mt-10 animate__animated animate__bounce animate__infinite"
            to="/apod"
          >
          <img src="assets/img/cohete.png" alt="">
          </v-btn>
      </v-col>
    </v-row>
    </v-img>
  </div>
</template>

<style  scoped>
.titulo {
  font-size: 4rem;
}

.animate__animated.animate__bounce {
  --animate-duration: 2s;
}

/* This changes all the animations globaly */
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.2s;
}
</style>