const state = () => ({
    list: [
        {
            seq : 1,
            desc : "Hello~" ,
            expiration : "2022-02-02 11:05:22" ,
            dateCreate : "2022-04-06 44:55:22" ,
            name : "신진섭" , 
            region : "Watt"
        }
        ,
        {
            seq : 2,
            desc : "Hello~" ,
            expiration : "2022-09-02 11:05:22" ,
            dateCreate : "2022-09-06 44:55:22" ,
            name : "신진섭" , 
            region : "Watt"
        }
    ],
  })

const mutations = {
    add (state, array) {
    const object = {
        seq : array[0],
        desc : array[1],
        expiration : array[2],
        dateCreate : array[3],
        name : array[4],
        region : array[5]
    }
      state.list.push(object)
    },

    setData (state, array) {

      state.list[array[0]-1].seq = array[0]
      state.list[array[0]-1].desc = array[1]
      state.list[array[0]-1].expiration = array[2]
      state.list[array[0]-1].dateCreate = array[3]
      state.list[array[0]-1].name = array[4]
      state.list[array[0]-1].region = array[5]
    }

  }

  const getters = {
    getData : (state) => (index) => {
      return state.list[index];
    },
    getSeq : (state) => {
      return state.list.length;
    }
  }


  export default {
    state,
    mutations,
    getters
  }
