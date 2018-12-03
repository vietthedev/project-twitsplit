// @flow

import React from 'react'
import styled from 'styled-components'

import MessageForm from './MessageForm'
import Message from '../components/Message'

import MessageContext from '../store/MessageContext'

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

export default React.memo<any>(() => (
  <StyledMain>
    <StyledDiv>
      <MessageForm />
    </StyledDiv>
    <MessageContext.Consumer>
      {
        ({ messages }) =>
          <div>
            {messages.map((message, index) => <Message key={index}>{message}</Message>)}
          </div>
      }
    </MessageContext.Consumer>
  </StyledMain>
))
