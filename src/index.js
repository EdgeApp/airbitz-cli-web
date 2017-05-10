/**
 * Adds text to the output area.
 */
function appendLine (text) {
  // Create a new div element:
  const newDiv = document.createElement('div')
  newDiv.appendChild(document.createTextNode(text))

  // Add that to the output:
  const output = document.getElementById('output')
  output.appendChild(newDiv)

  // Scroll the page:
  window.scrollTo(0, document.body.scrollHeight)
}

appendLine('Hello world')
