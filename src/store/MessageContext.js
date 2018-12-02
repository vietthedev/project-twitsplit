// @flow

import React from 'react'

import type { MessageType, MessageContextType } from '../common/types'

export default React.createContext<MessageContextType>({
  messages: [],
  addMessages: (messages: MessageType[]) => {}
})
