import { findCommand } from 'airbitz-cli'
import { makeContext } from 'airbitz-core-js'
import parse from 'lib-cmdparse'

/**
 * Adds text to the output area.
 */
function appendLine (text, pre = false) {
  // Create a new div element:
  const newDiv = document.createElement(pre ? 'pre' : 'div')
  newDiv.appendChild(document.createTextNode(text))

  // Add that to the output:
  const output = document.getElementById('output')
  output.appendChild(newDiv)

  // Scroll the page:
  window.scrollTo(0, document.body.scrollHeight)
}

/**
 * Creates the session and switches to the CLI screen.
 */
function onStart (event) {
  const opts = {}

  // Load options:
  const keys = ['apiKey', 'appId', 'authServer']
  keys.forEach(key => {
    const value = document.getElementById(key).value
    if (value == null) {
      console.log(`error: ${key} is blank`)
    }
    window.localStorage.setItem('airbitz-cli/' + key, value)
    opts[key] = value
  })
  appendLine('Ready')

  const context = makeContext(opts)

  // Create session:
  window.session = {
    context
  }
}

/**
 * Handles the user pressing enter.
 */
function onEnter (event) {
  const raw = document.getElementById('command')
  const line = raw.value
  raw.value = ''

  try {
    const parsed = parse(line)

    if (!window.session) {
      onStart()
    }

    // Look up the command:
    const cmd = parsed.exec ? findCommand(parsed.exec) : findCommand('help')

    // Execute the command:
    appendLine(line)

    const console = {
      log (...args) {
        if (args.length === 1) {
          const arg = args[0]
          if (typeof arg === 'string') {
            appendLine(arg)
          } else if (arg instanceof Error) {
            appendLine(arg.toString())
            if (arg.stack) appendLine(arg.stack)
          } else {
            appendLine(JSON.stringify(arg, null, 2), true)
          }
        } else {
          appendLine(args.join(' '))
        }
      }
    }

    // Invoke the command:
    const out = Promise.resolve(
      cmd.invoke(console, window.session, parsed.args)
    )
    out.catch(e => appendLine(e.message))
  } catch (e) {
    appendLine(e.message)
  }
}

function main () {
  // Set up defaults:
  const keys = ['apiKey', 'appId', 'authServer']
  keys.forEach(key => {
    const value = window.localStorage.getItem('airbitz-cli/' + key)
    if (value != null) {
      document.getElementById(key).value = value
    }
  })

  // Set up start handler:
  document.getElementById('setup').addEventListener('submit', onStart)

  // Set up enter key listener:
  document.getElementById('command').addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      onEnter(event)
    }
  })

  onStart()
}

main()
