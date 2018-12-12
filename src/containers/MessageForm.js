// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'

import MessageContext from '../store/MessageContext'

import { MESSAGE_CHARACTER_LIMIT } from '../common/constants'
import { normalizeMessage, splitMessage } from '../common/utils'

const StyledInputDiv = styled.div`
text-align: center;
`
const StyledTextArea = styled(Textarea)`
width: 80%;

padding: .5rem;

border: 1px solid #e6ecf0;
border-radius: 8px;
outline: none;

resize: none;
overflow: hidden;

transition: all ease-in-out .2s;

&:focus {
  border: 2px solid #6c68d7;
}
`
const StyledButtonDiv = styled.div`
text-align: right;
`
const StyledButton = styled.button`
padding: 6px 16px;

color: #fff;
background-color: #8986df;

border-color: transparent;
border-radius: 100px;

cursor: pointer;

font-size: 14px;
font-weight: bold;
line-height: 20px;

box-shadow: none;

transition: all .15s ease-in-out;

&:hover {
  background-color: #5c5a9e;
}

&:disabled {
  opacity: .3;

  cursor: not-allowed;
}
`
const ErrorMessage = styled.span`
color: #f00;
`

type MessageFormProps = any

type MessageFormState = {
  value: string,
  errorMessage: string
}

export default class MessageForm extends PureComponent<MessageFormProps, MessageFormState> {
  static contextType = MessageContext

  handleChange: (event: SyntheticEvent<HTMLTextAreaElement>) => void
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void

  constructor (props: MessageFormProps) {
    super(props)

    this.state = { value: '', errorMessage: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event: SyntheticEvent<HTMLTextAreaElement>) {
    this.setState({ value: event.currentTarget.value })
  }

  handleSubmit (event: SyntheticEvent<HTMLFormElement>) {
    try {
      const message = normalizeMessage(this.state.value)

      this.context.addMessages(message.length <= MESSAGE_CHARACTER_LIMIT ? [message] : splitMessage(message))
      this.setState({ value: '', errorMessage: '' })
    } catch (ex) {
      this.setState({ errorMessage: ex.message })
    }

    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <StyledInputDiv>
          <StyledTextArea
            async
            autoFocus
            placeholder="What's happening?"
            value={this.state.value}
            onChange={this.handleChange}
          />
          {this.state.errorMessage ? <div><ErrorMessage>{this.state.errorMessage}</ErrorMessage></div> : null}
        </StyledInputDiv>
        <StyledButtonDiv>
          <StyledButton type='submit' disabled={!this.state.value.trim()}>Tweet</StyledButton>
        </StyledButtonDiv>
      </form>
    )
  }
}
