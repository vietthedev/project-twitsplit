# Assignment - Project TwitSplit

## Description

The product Tweeter allows users to post short messages limited to 50 characters each.

Sometimes, users get excited and write messages longer than 50 characters.

Instead of rejecting these messages, we would like to add a new feature that will split the message into parts and send multiple messages on the user's behalf, all of them meeting the 50 character requirement.

## Example

Suppose the user wants to send the following message:

> I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.

This is 91 characters excluding the surrounding quotes. When the user presses send, it will send the following messages:

> 1/2 I can't believe Tweeter now supports chunking" "2/2 my messages, so I don't have to do it myself.

Each message is now 49 characters, each within the allowed limit.

## Requirements

* Create a web application that serves the Tweeter interface. It will support the following functionality:
  * Allow the user to input and send messages.
  * Display the user's messages.
  * If a user's input is less than or equal to 50 characters, post it as is.
  * If a user's input is greater than 50 characters, split it into chunks that each is less than or equal to 50 characters and post each chunk as a separate message.
  * Messages will only be split on whitespace. If the message contains a span of non-whitespace characters longer than 50 characters, display an error.
  * Split messages will have a "part indicator" appended to the beginning of each section. In the example above, the message was split into two chunks, so the part indicators read "1/2" and "2/2". Be aware that these count toward the character limit.
* The functionality that splits messages should be a standalone function.

Given the above example, its function call would look like:
```javascript
splitMessage("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.")
```

and it would return

```javascript
["1/2 I can't believe Tweeter now supports chunking", "2/2 my messages, so I don't have to do it myself."]
```
* The business logic (a.k.a. the message splitter) should be unit tested. We have to know it works, right?
* The submission should be a git repository. In the project directory, `git log` should show your commits.
* Bonus points for any additional polish and sophistication you add to the experience.

## Considerations - What are we looking for?

* We want to see how you create a new project and what technologies you decide to you use. A good project will be cleanly structured, will only contain the dependencies it needs, and will be well-documented and well-tested. What matters is not the technologies you use, but the reasons for your decisions. Bonus points will be given for demonstrating knowledge of modern Javascript techniques and best practices.
* We want to see your command of core web technologies: HTML, CSS, JavaScript. The most critical part of this assignment is the message splitting functionality; so this should be in plain Javascript without the use of libraries. The rest of the application may make use of utility libraries and frameworks.
