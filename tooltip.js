function spawnTooltip(elem, options) {

  const { title, description, onApprove } = options

  let titleElem = document.getElementsByClassName('tooltip-title')[0]
  titleElem && (titleElem.textContent = title || '')

  let descElem = document.getElementsByClassName('tooltip-description')[0]
  descElem && (descElem.textContent = description || '')

  let btnElem = document.getElementsByClassName('tooltip-button')[0]
  btnElem && (btnElem.onclick = onApprove)

  let tooltip = document.getElementById('tooltip-template')
  if (!tooltip) return
  
  tooltip.removeAttribute('hidden')

  let rect = elem.getBoundingClientRect()
  const offset = {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  }

  let root = document.documentElement
  root.style.setProperty('--tooltip-top-offset', offset.top + 'px')
  root.style.setProperty('--tooltip-left-offset', offset.left + 'px')
}

// Manage creation and destruction of tooltip elements
document.documentElement.addEventListener('click', function(event) {

  // Remove all existing tooltip elements unless the thing that was clicked on
  // was itself a tooltip element.
  if (!event.target.matches('.tooltip, .tooltip *')) {
    document.querySelectorAll('.container .tooltip').forEach(function(elem) {
      elem.remove()
    })
  }

  // Spawn tooltips when our links are clicked.
  switch (event.target.id) {
    case 'link1':
      event.preventDefault()
      spawnTooltip(event.target, {
        title: 'First tooltip',
        description: 'Click away to dismiss.',
      })
      break
    case 'link2':
      event.preventDefault()
      spawnTooltip(event.target, {
        title: 'Second tooltip',
        description:
          "Click away to dismiss. You can click the button too, but it won't do anything.",
      })
      break
    case 'link3':
      event.preventDefault()
      spawnTooltip(event.target, {
        title: 'Third tooltip',
        description: 'Click the button to trigger an alert.',
        onApprove: function(ev) {
          alert('Alert triggered by third tooltip.')
        },
      })
      break
    default:
      if (!event.target.closest('#tooltip-template')) {
        document.getElementById('tooltip-template').setAttribute('hidden', '')
      }
  }
})
