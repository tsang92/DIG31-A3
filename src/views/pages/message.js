import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'
import MessageAPI from './../../MessageAPI'

class MessageView {
  
  async init(Id) {
    try {
      document.title = 'Message'
      this.messageId = Id
      const message = await MessageAPI.getMessage(Id)
     
      this.displayMessage(message)
      this.render()
      Utils.pageIntroAnim()
    } catch (err) {
      Toast.show(err, 'error')
    }
  }

  async submitHandler(e, Id){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try {
    await MessageAPI.addComment(formData, Id)  
    const message = await MessageAPI.getMessage(Id); // Retrieve the updated message
    this.displayMessage(message)

 
    }catch(err){     
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

 async displayMessage(message) {
    const author = await UserAPI.getUser(message.author)
 
  
    const messageEl = document.createElement('div')
    messageEl.className = 'message-entry';
    messageEl.innerHTML = `
      <h1 class="brand-color">${message.title}</h1>
      <p>${message.message}</p>
      <p class="details">Posted by ${author.firstName} ${author.lastName} on ${new Date(message.createdAt).toDateString()}</p>
    `;
  
    const resultsEl = document.querySelector('#messageResult');
    resultsEl.innerHTML = ''; // Clear existing content
    resultsEl.append(messageEl);

    const resultsEl2 = document.querySelector('#result')
    resultsEl2.innerHTML = ''; // Clear existing content

   const comments = message.comments.map(comment => {
    const messageEl2 = document.createElement('div')
    messageEl2.className = 'message-entry2'
    messageEl2.innerHTML = `

    <p>${comment.userComment}</p>
    <p class="details">Posted by ${comment.author} on ${new Date(comment.created).toDateString()}</p>
    `
  
 
    resultsEl2.append(messageEl2)
  })

  }

  render() {
    const template = html`

    <style>      
   
    .message-entry {
      border-bottom: solid 3px var(--brand-color);
 
      margin: 2em 0;
    }
    .message-entry2 {
      border-bottom: solid 1px white;
      margin: 2em 0;
    }

    .details {
      font-size: small;
    }
    
       </style>
      <va-app-header title="Message Detail" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">      
        <div class="content"> 
        <div id="messageResult"> </div>
        <div id="result"> </div>
        <sl-form class="form-signup" @sl-submit=${(e) => this.submitHandler(e, this.messageId)}>

            <div class="input-group">
            <input type="hidden" name="author" value="${Auth.currentUser.firstName} ${Auth.currentUser.lastName}" />
            <sl-textarea name="userComment" type="text"  placeholder="Enter your comment"></sl-textarea>
            </div>            
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Submit</sl-button>
          </sl-form>
          <p style="text-align: center;"><a href="/messageBoard" @click=${anchorRoute}>Go Back</a></p>

          </div> </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new MessageView()