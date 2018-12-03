// @flow

import { splitMessage } from './index'

it('should split a message correctly when the message is valid', () => {
  expect(splitMessage("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."))
    .toEqual([
      "1/2 I can't believe Tweeter now supports chunking",
      "2/2 my messages, so I don't have to do it myself."
    ])
})

it('should throw Error when there is a word whose length is longer than 50 characters in the message', () => {
  expect(splitMessage('This is a message with a looooooooooooooooooooooooooooooooooooooooooooooong word.'))
    .toThrowError()
})

it('should throw Error when there is a word that concatenating it with the indicator would exceed 50 characters limit',
  () => {
    expect(splitMessage('This is hell-of-a-word-because-it-is-very-very-very-long')).toThrowError()
  })
