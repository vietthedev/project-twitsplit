// @flow

import React, { Component } from 'react'

import Main from './containers/Main'

import type { MessageType } from './common/types'
import MessageContext from './store/MessageContext'

type AppProps = any

type AppState = {
  messages: MessageType[],
  addMessages: (messages: MessageType[]) => void
}

export default class App extends Component<AppProps, AppState> {
  addMessages: (messages: MessageType[]) => void

  constructor (props: AppProps) {
    super(props)

    this.addMessages = (messages: MessageType[]) => {
      this.setState(prevState => ({ messages: [...prevState.messages, ...messages] }))
    }

    this.state = {
      messages: [
        {
          id: 1,
          content: '1/1 This is the first message.'
        },
        {
          id: 2,
          content: '1/1 This is the second message.'
        }
      ],
      addMessages: this.addMessages }
  }

  render () {
    return (
      <MessageContext.Provider value={this.state}>
        <Main />
      </MessageContext.Provider>
    )
  }
}
