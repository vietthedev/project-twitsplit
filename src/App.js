// @flow

import React, { Component } from 'react'

import Main from './containers/Main'

import MessageContext from './store/MessageContext'

type AppProps = any

type AppState = {
  messages: string[],
  addMessages: (messages: string[]) => void
}

export default class App extends Component<AppProps, AppState> {
  addMessages: (messages: string[]) => void

  constructor (props: AppProps) {
    super(props)

    this.addMessages = (messages: string[]) => {
      this.setState(prevState => ({ messages: [...prevState.messages, ...messages] }))
    }

    this.state = {
      messages: [
        '1/1 This is the first message.',
        '1/1 This is the second message.'
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
