// @flow

import React from 'react'

import type { MessageContextType } from '../common/types'

export default React.createContext<MessageContextType>({
  messages: [],
  addMessages: (messages: string[]) => {}
})
