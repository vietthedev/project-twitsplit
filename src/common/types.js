// @flow

export type MessageType = {
  id: number,
  content: string
}

export type MessageContextType = {
  messages: MessageType[],
  addMessages:(messages: MessageType[]) => void
}
