export const state = () => ({
    Link: {
      "notice": "공지사항",
      "notice-create" : "공지사항 작성",
      "notice-details-id" : "공지사항 상세",
      "datamanagement" : "자료 관리"
    },
    authenticated : false,
    headerTitle: undefined
    })
    
    export const getters = {
      getUrl : (state) => (id) => {
        return state.Link[id];
      }
    }

    export const mutations = {
      setHeaderTitle (state, payload) {
        state.headerTitle = payload
      }
    }

  
  
    