import { removeQuestion } from '@/api/question'

export default {
  actions: {
    removeQuestion ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        removeQuestion(id).then(() => {
          console.log('删除成功：id= ' + id)
          commit('removeQuestion', id)
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    }
  }
}
