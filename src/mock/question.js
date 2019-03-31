import { questionType } from './question/questionType'
import { difficulty } from './question/difficulty'
import { remark } from './question/remark'
import { knowledgePoint } from './question/knowledgePoint'
import { question } from './question/question'

export const getQuestionType = req => {
  return questionType
}

export const getDifficulty = req => {
  return difficulty
}

export const getRemark = req => {
  return remark
}

export const getKnowledgePoint = req => {
  return knowledgePoint
}

export const getQuestion = req => {
  return question
}
