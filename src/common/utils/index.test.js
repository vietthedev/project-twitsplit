// @flow

import { splitMessage } from './index'

const validMessage = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."
const invalidMessage = 'This is a looooooooooooooooooooooooooooooooooooooooooooooong message.'

it(`should split message ${validMessage} correctly`, () => {
  expect(splitMessage(validMessage))
    .toEqual([
      "1/2 I can't believe Tweeter now supports chunking",
      "2/2 my messages, so I don't have to do it myself."
    ])
})

it(`should throw Error with message ${invalidMessage}`, () => {
  expect(splitMessage(invalidMessage))
    .toThrowError()
})
