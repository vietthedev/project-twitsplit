// @flow

import { splitMessage } from './index'
import { MESSAGE_LIMIT_EXCEEDED_ERROR } from '../constants'

it('should split a message correctly when the message is valid', () => {
  expect(splitMessage("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."))
    .toEqual([
      "1/2 I can't believe Tweeter now supports chunking",
      "2/2 my messages, so I don't have to do it myself."
    ])
})

it('should split another valid message correctly', () => {
  expect(splitMessage('Praesent at lectus cursus, tincidunt ipsum ac, dapibus mauris. Donec nec dolor ante. Fusce nec purus tincidunt, rutrum ex at, mattis sem. Nam congue venenatis ex vitae efficitur. Vestibulum in mauris sed tellus aliquam feugiat. Nullam blandit ex in lacus tempus, eget placerat neque mattis. Etiam sit amet dui vulputate,'))
    .toEqual([
      '1/8 Praesent at lectus cursus, tincidunt ipsum',
      '2/8 ac, dapibus mauris. Donec nec dolor ante.',
      '3/8 Fusce nec purus tincidunt, rutrum ex at,',
      '4/8 mattis sem. Nam congue venenatis ex vitae',
      '5/8 efficitur. Vestibulum in mauris sed tellus',
      '6/8 aliquam feugiat. Nullam blandit ex in lacus',
      '7/8 tempus, eget placerat neque mattis. Etiam sit',
      '8/8 amet dui vulputate,'
    ])
})

it('should split a message into chunks with their length no greater than 50', () => {
  expect(splitMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget tincidunt ante. Donec finibus nulla sit amet risus auctor lacinia. Suspendisse sed ipsum sit amet nisl convallis euismod. Duis odio massa, maximus in diam non, consectetur mollis dui. Sed nisl dui, ultrices eu sapien aliquet, fermentum faucibus nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sed viverra libero. Etiam auctor sagittis dui at feugiat.')
    .every(chunk => chunk.length <= 50))
    .toBe(true)
})

it('should throw Error when there is a word whose length is greater than 50 characters in the message', () => {
  try {
    splitMessage('This is a message with a looooooooooooooooooooooooooooooooooooooooooooooong word.')
  } catch (ex) {
    expect(ex.message).toEqual(MESSAGE_LIMIT_EXCEEDED_ERROR)
  }
})

it('should throw Error when there is a word that concatenating it with the indicator would exceed 50 characters limit',
  () => {
    try {
      splitMessage('This is hell-of-a-word-because-it-is-very-very-very-long')
    } catch (ex) {
      expect(ex.message).toEqual(MESSAGE_LIMIT_EXCEEDED_ERROR)
    }
  })
