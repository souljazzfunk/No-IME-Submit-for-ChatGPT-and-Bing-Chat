(function() {
  const hostname = window.location.hostname

  const suppressSubmit = () => {
    let input
    let isLastKeyDownIME = false
    // console.log(hostname)
    if (hostname === 'www.bing.com') {
      input = document.getElementsByClassName('cib-serp-main')[0].shadowRoot.getElementById("cib-action-bar-main").shadowRoot.getElementById('searchbox')
    }
    else if (hostname === 'chat.openai.com') {
      input = document.querySelector('textarea')
    }
  
    input.addEventListener('keydown', e => {
      // console.log('DOWN: ' + e.key, e.keyCode, e.isComposing)
      if(e.isComposing) {
        isLastKeyDownIME = true
        if(e.key === 'Enter') {
          e.stopPropagation()
          // console.log('IME Enter: DOWN')
        }
      }
    }, true)

    input.addEventListener('keyup', e => {
      // console.log('UP: ' + e.key, e.keyCode, e.isComposing)
      if(e.key === 'Enter' && isLastKeyDownIME) {
        e.stopPropagation()
        // console.log('IME Enter: UP')
      }
    }, true)
  }

  const waitForInput = (wait) => {
    setTimeout(() => {
      try {
        suppressSubmit()
      } catch (e) {
        console.log(e)
        if (wait < 5000) {
          waitForInput(wait + 500)
        }
      }
    }, wait)
  }

  waitForInput(500);
})()

