function spawnTooltip(elem, options) {
  /*** IMPLEMENT THIS FUNCTION ***/
  
  console.log('elem', elem)
  let tooltip = document.getElementById('tooltip-template').toggleAttribute('hidden')
  // tooltip.toggleAttribute('hidden')
  
  let rect = elem.getBoundingClientRect()
  const offset = {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  }
  
  console.log(offset)
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
  }
})
