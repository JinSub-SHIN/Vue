export const state = () => ({
  UserMap: {
    "admin": { "password": "1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w=="}
  },
  authenticated : false,
  })
  
  export const mutations = {
    add (state, array) {
      var username = array[0];
      var password  = array[1];
      state.UserMap[username] = password
    },

    changeStatus ( state ) {
      if(state.authenticated == true) {
        state.authenticated = false;
      } else {
        state.authenticated = true;
      }
    }
  }

  export const getters = {
    getPassword: (state) => (id) => {
      return state.UserMap[id];
    }
  }


  