// @flow

import React from 'react'
import styled from 'styled-components'

import MessageForm from './MessageForm'
import Message from '../components/Message'

import MessageContext from '../store/MessageContext'

import type { MessageType } from '../common/types'

const StyledMain = styled.main`
margin: 0 auto;

@media (min-width: 576px) {
  width: 540px;
}

@media (min-width: 768px) {
  width: 720px;
}

@media (min-width: 992px) {
  width: 960px;
}

@media (min-width: 1200px) {
  width: 1140px;
}
`
const StyledDiv = styled.div`
padding: 1rem;

background-color: #efeffa;
`

const messageComparer = (a: MessageType, b: MessageType) => {
  if (a.id < b.id) return 1

  if (a.id > b.id) return -1

  return 0
}

export default React.memo<any>(() => (
  <StyledMain>
    <StyledDiv>
      <MessageForm />
    </StyledDiv>
    <MessageContext.Consumer>
      {
        ({ messages }) =>
          <div>
            {messages.sort(messageComparer).map(message => <Message key={message.id}>{message.content}</Message>)}
          </div>
      }
    </MessageContext.Consumer>
  </StyledMain>
))
