import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">    
      <div class="content">  
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
        <h2 class=brand-color>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <p><b>Email:</b> ${Auth.currentUser.email}</p>
        <p><b>Phone:</b> ${Auth.currentUser.phone}</p>
        <p><b>Status:</b> ${Auth.currentUser.status}</p>

        <sl-button type="primary" class="submit-btn" @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
        </div>       
        </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()