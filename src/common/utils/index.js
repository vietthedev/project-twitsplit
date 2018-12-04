// @flow

import { MESSAGE_CHARACTER_LIMIT, MESSAGE_LIMIT_EXCEEDED_ERROR } from '../constants'

export const normalizeMessage = (message: string) => {
  return message.trim().replace(/[\n\s+]/g, ' ')
}

const messageChunkMapper = (numChunks) =>
  (messageChunk, index) => `${index + 1}/${numChunks} ${messageChunk.substr(messageChunk.indexOf(' ') + 1)}`

/**
 * Split a message into chunks and return them as an array.
 * @param {string} message A message to be split.
 * @returns {string[]}
 */
export const splitMessage = (message: string) => {
  // Take into account the forward slash and a space of the indicator.
  const messageLength = message.length
  const initialCharacterLimit = MESSAGE_CHARACTER_LIMIT - 2
  const leastNumChunks = Math.ceil(messageLength / initialCharacterLimit)
  let calculatedCharacterLimit = initialCharacterLimit - leastNumChunks.toString().length * 2
  let calculatedNumChunks = Math.ceil(messageLength / calculatedCharacterLimit)
  let messageChunks: string[] = []
  let position = 0
  let currentChunkNumber = 1
  // This is used to determine whether we need to add to calculatedNumChunks.
  let numExtraCharacters = 0
  let previousNumRemainingChunks = 0

  while (position <= messageLength) {
    if (message.charAt(position) === ' ') {
      position++

      continue
    }

    const numRemainingChunks = Math.ceil((messageLength - position) / calculatedCharacterLimit)

    // Number of chunks is miscalculated.
    if (numRemainingChunks === previousNumRemainingChunks) {
      const oldNumChunkLength = calculatedNumChunks.toString().length

      calculatedNumChunks++

      const newNumChunkLength = calculatedNumChunks.toString().length

      if (newNumChunkLength > oldNumChunkLength) {
        // Indicator length messed up so we will start over
        calculatedCharacterLimit = initialCharacterLimit - newNumChunkLength * 2
        calculatedNumChunks = Math.ceil(messageLength / calculatedCharacterLimit)
        messageChunks = []
        position = 0
        currentChunkNumber = 1
        numExtraCharacters = 0
        previousNumRemainingChunks = 0

        continue
      }

      messageChunks = messageChunks.map(messageChunkMapper(calculatedNumChunks))
      numExtraCharacters -= calculatedCharacterLimit
    } else {
      previousNumRemainingChunks = numRemainingChunks
    }

    const chunk = message.substr(position, calculatedCharacterLimit)

    if (chunk.length < calculatedCharacterLimit) {
      messageChunks.push(`${currentChunkNumber}/${calculatedNumChunks} ${chunk}`)

      break
    }

    if (chunk.charAt(chunk.length - 1) === ' ') {
      messageChunks.push(`${currentChunkNumber}/${calculatedNumChunks} ${chunk.trimRight()}`)
      currentChunkNumber++
      position += calculatedCharacterLimit

      continue
    }

    const lastSpaceIndex = chunk.lastIndexOf(' ')

    if (lastSpaceIndex === -1) throw Error(MESSAGE_LIMIT_EXCEEDED_ERROR)

    numExtraCharacters += chunk.substr(lastSpaceIndex + 1).length

    if (numExtraCharacters > calculatedCharacterLimit) {
      const oldNumChunkLength = calculatedNumChunks.toString().length

      calculatedNumChunks++

      const newNumChunkLength = calculatedNumChunks.toString().length

      if (newNumChunkLength > oldNumChunkLength) {
        calculatedCharacterLimit = initialCharacterLimit - newNumChunkLength * 2
        calculatedNumChunks = Math.ceil(messageLength / calculatedCharacterLimit)
        messageChunks = []
        position = 0
        currentChunkNumber = 1
        numExtraCharacters = 0
        previousNumRemainingChunks = 0

        continue
      }

      messageChunks = messageChunks.map(messageChunkMapper(calculatedNumChunks))
      numExtraCharacters -= calculatedCharacterLimit
    }

    messageChunks.push(`${currentChunkNumber}/${calculatedNumChunks} ${chunk.substr(0, lastSpaceIndex)}`)
    currentChunkNumber++
    position += lastSpaceIndex + 1
  }

  return messageChunks
}
