import axios from '@/libs/api.request'

export const getQuestionType = () => {
  return axios.request({
    url: 'get_question_type',
    method: 'get'
  })
}

export const getDifficulty = () => {
  return axios.request({
    url: 'get_difficulty',
    method: 'get'
  })
}

export const getRemark = () => {
  return axios.request({
    url: 'get_remark',
    method: 'get'
  })
}

export const getKnowledgePoint = () => {
  return axios.request({
    url: 'get_knowledge_point',
    method: 'get'
  })
}

export const getQuestion = () => {
  return axios.request({
    url: 'get_question',
    method: 'get'
  })
}

export const removeQuestion = id => {
  return axios.request({
    url: 'question/delete',
    method: 'post',
    data: {
      id
    }
  })
}
