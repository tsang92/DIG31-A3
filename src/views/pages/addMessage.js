import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import GroupAPI from './../../GroupAPI'
import MessageAPI from './../../MessageAPI'

class AddMessageView {
  
  async init(id) {
    try {
      document.title = 'Add Message'
      this.render()
      Utils.pageIntroAnim()
    } catch (err) {
      Toast.show(err, 'error')
    }
  }

  async submitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try {
      const message = await MessageAPI.addMessage(formData)  
      const groupId = Auth.currentUser.group
   
    await GroupAPI.addMessage(message._id, groupId)   
      gotoRoute('/messageBoard')
    }catch(err){     
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  
  }

  render() {
    const template = html`
    <style>      
   

 p {
  text-align: center
 }
 

    </style>
      <va-app-header title="Message Detail" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content ">      
      <div class="content"> 
          <h1 class="brand-color">Add Message</h1>
          <sl-form class="form-signup" @sl-submit=${this.submitHandler}>
            <div class="input-group">
            <input type="hidden" name="author" value=${Auth.currentUser._id}  />
              <sl-input name="title" type="text" placeholder="Enter a title" required></sl-input>
            </div>


            <div class="input-group">
            <sl-textarea name="message" type="text"  placeholder="Enter your message"></sl-textarea>
            </div>            
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Submit</sl-button>
          </sl-form>
          <p ><a href="/messageBoard" @click=${anchorRoute}>Go Back</a></p>

          </div> </div>
    `
    render(template, App.rootEl)
  }
}


export default new AddMessageView()