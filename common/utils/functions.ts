import { ValidationErrorItem } from "joi"

export const formatJoiMessage = (joiMessages: ValidationErrorItem[]) => {
    return joiMessages.map((msgObj) => msgObj.message.replace(/"/g, ''))
  }