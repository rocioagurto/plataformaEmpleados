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
      username: '',
      email: '',
      phone: 0,
      address: {
        street: '',
        suite: '',
        city: ''
      },
      website: ''
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
  ADD_EMP(state, data){state.empleados.unshift(data)},
  EDIT_EMP(state, data){state.empleados.push(data)},
  DELETE_EMP(state, index){state.empleados.splice(index, 1)},
  UPDATE_CURRENTUSER(state, user) {state.currentUser = user, setInStorage('user', user)},
  SET_EMPS(state, data){state.empleados = data},
  SET_CURRENT_EMP(state, empleado){state.currentEmp = empleado},
  UPDATE_NAME(state, name){ state.currentEmp.data.username = name},
  UPDATE_EMAIL(state, email){ state.currentEmp.data.email = email},
  UPDATE_CEL(state, cel){ state.currentEmp.data.phone = cel},
  UPDATE_CIUDAD(state, ciudad){ state.currentEmp.data.address.city = ciudad},
  UPDATE_SITIOWEB(state, sitioWeb){state.currentEmp.data.website = sitioWeb},
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
  setEmps({state, commit}){
    if(state.empleados.length == 0){
      axios.get(`https://jsonplaceholder.typicode.com/users/`)
      .then(res => {
      console.log(res.data)
      let empleados = res.data
      commit('SET_EMPS', empleados)
    })
      .catch(err => {
        console.log(err)
      })
    }
  },

    postEmp({ commit, state}){
    axios.post(`https://jsonplaceholder.typicode.com/users/`, state.currentEmp.data )
      .then((res) =>{
        commit('ADD_EMP', res.data)
        commit('SET_EMPTY_EMP')
      })
    },
    updateEmp({ state, commit }, id) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, state.currentEmp.data)
      .then((res) => {
        commit('EDIT_EMP', res.data)
        commit('SET_EMPTY_EMP')
      })
      .catch(e => {console.error(e.res)})
    },
    deleteEmp({commit, state}, id) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        const index = state.empleados.findIndex(item => item._id === res.data._id)
        console.log(index)
        commit('DELETE_EMP', res.data)
      })
      .catch(e => {console.error(e.res)})
    },
    updateName ({ commit }, name) { commit('UPDATE_NAME', name)},
    updateEmail ({ commit }, email) { commit('UPDATE_EMAIL', email)},
    updateCel ({ commit }, cel) { commit('UPDATE_CEL', cel)},
    updateCiudad ({ commit }, ciudad) { commit('UPDATE_CIUDAD', ciudad)},
    updateSitioWeb ({ commit }, sitioWeb) { commit('UPDATE_SITIOWEB', sitioWeb)},

    setCurrentEmp({ commit, getters }, id){
      let targetEmp =  getters.searchEmpById(id)
      if(targetEmp){
        commit('SET_CURRENT_EMP', targetEmp)
      } else {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
        commit('SET_CURRENT_EMP', response.data)
        })
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    searchEmpById: (state) => (id) => {
      return state.empleados.find(empleado => empleado.id === id)
    }
  }
})
