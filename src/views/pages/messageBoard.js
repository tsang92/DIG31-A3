import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'
import GroupAPI from './../../GroupAPI'

class MessageBoardView {
  init(){
    document.title = 'Message Board'   
    this.getMessages()
    this.render()    
    Utils.pageIntroAnim()
  }

  async getMessages(){
    try {
      const user = await UserAPI.getUser(Auth.currentUser._id)
      const messages = await GroupAPI.getGroupMessages(user.group) 

      messages.forEach(message => {
        const messageEl = document.createElement('div')
        messageEl.className = 'message-entry'
        messageEl.innerHTML = `

        <a href="/message/${message._id}"  @click=${anchorRoute}>

        <sl-card class="card-header">
  <div slot="header">
  <h3>${message.title}</h3>
  </div>

  ${message.message}

</sl-card>


       </a>
        `
        const resultsEl = document.querySelector('#result')
        resultsEl.append(messageEl)
      })

    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){

    const template = html`
    <style>
  .card-header {
    max-width: 300px;
    color: black;
    display: inline;
  }

  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }

  .message-entry {
    margin: 0.5em 0;
  }

  #result {
    margin: 0 0 1em;
  }

  .btn {
    display: inline;
  }

  h3 {
    color: black;
  }

  .details {
    font-size: small;
  }
  

</style>
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">    
      <div class="content"> 
        <h1 class="brand-color">Message Board</h1>
        <div id="result"> </div>

        <sl-button @click=${()=> gotoRoute('/addMessage')}  type="primary" class="btn" >Add Message</sl-button>
      </div>      </div>    
    `
    render(template, App.rootEl)
}
}


export default new MessageBoardView()