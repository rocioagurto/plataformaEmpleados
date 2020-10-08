import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
function emptyEmp() {
  return{
    id: null,
    data:{
      name: '',
      email: '',
      cel: '',
      direccion: '',
      sitioWeb: ''
    }
  }
}

export default new Vuex.Store({
  state: {
    currentUser: getFromStorage('user') || undefined,
    empleados: [],
    currentEmp: emptyEmp(),
  
  },
  mutations: {
    SET_EMPTY_EMP (state) {
      state.currentEmp.id = null
      const empty = emptyEmp()
      Object.keys(empty.data).forEach(key => {
        state.currentEmp.data[key] = empty.data[key]
      })
    },
    UPDATE_CURRENTUSER(state, user) {state.currentUser = user, setInStorage('user', user)},
    SET_EMPS(state, data){state.empleados = data},
   
    
    SET_CURRENT_EMP(state, empleado){state.currentEmp = empleado},
    SHOW_MODAL_EMP(state){state.showForm = true},
    HIDE_MODAL_EMP(state){state.showForm = false},
    UPDATE_NAME(state, name) { state.currentEmp.data.name = name},
    UPDATE_EMAIL(state, email) { state.currentEmp.data.email = email},
    UPDATE_CEL(state, cel) { state.currentEmp.data.cel = cel},
    UPDATE_DIRECCION(state, direccion) { state.currentEmp.data.direccion = direccion},
    UPDATE_SITIOWEB(state, sitioWeb) { state.currentEmp.data.sitioWeb = sitioWeb},
  },
  actions: {
  updateUser({commit}, user){
      return new Promise((resolve, reject) => {
      try{ 
        commit('UPDATE_CURRENTUSER', user)
        resolve(user)
      } catch(e) { reject(e) }
    })
  },
  setEmps({commit}){
    axios.get('https://jsonplaceholder.typicode.com/users', {headers: {"Content-type": "text/plain"}})
      .then(res => {
      console.log(res.data)
      let empleados = res.data
      commit('SET_EMPS', empleados)
      commit('SET_EMPTY_EMP')
    })
      .catch(err => {
        console.log(err)
      })
  },
    showModalEmp({ commit }) { commit('SHOW_MODAL_EMP')},
    hideModalEmp({ commit }) { commit('HIDE_MODAL_EMP')},

    closeForm ({commit}){
    commit('HIDE_MODAL_EMP')
    commit('SET_EMPTY_EMP')
  },
    updateName ({ commit }, name) { commit('UPDATE_NAME', name)},
    updateEmail ({ commit }, email) { commit('UPDATE_EMAIL', email)},
    updateCel ({ commit }, cel) { commit('UPDATE_CEL', cel)},
    updateDireccion ({ commit }, direccion) { commit('UPDATE_DIRECCION', direccion)},
    updateSitioWeb ({ commit }, sitioWeb) { commit('UPDATE_SITIOWEB', sitioWeb)},

    postEmp({ dispatch, state}){
    axios.post('https://jsonplaceholder.typicode.com/users', state.currentEmp.data )
      .then(() =>{
        dispatch('setEmps');
      })
    },
    updateEmp({ state, dispatch }, id) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, state.currentEmp.data)
      .then(() => {
        dispatch('setEmps')
      })
    },
    setCurrentEmp({ commit }, id){
      axios.get(`https://jsonplaceholder.typicode.com/users/user/${id}`)
      .then((response) => {
        commit('SET_CURRENT_EMP', response.data)
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  }
})
