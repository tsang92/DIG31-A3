import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from './../../Toast'
 
class GuideView {
  init(){
    document.title = 'Guide'   
    this.render()   
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try {
      const updateUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false }, 'json')
    } catch (error) {
        Toast.show(error, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
      <div class="content">       
        <h1 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h1>
        <p>This is a quick tour to teach you the basics of using the WGSConnect application</p>

        <div class="guide-step">
          <h4>Register Group</h4>
          <p>- From the drop down menu select the sports group you would like to be in and click the register button</p>
          <p>- The current options are AFL, Soccer, Basketball and Tennis</p>
        </div>

        <div class="guide-step">
          <h4>Home</h4>
          <p>- From the home screen you have quick access to naviagte to your profile page or the message board</p>
          <p>- Click on the section you would like to navigate to</p>
        </div>

        <div class="guide-step">
          <h4>Message Board</h4>
          <p>- The message board page shows all the messages posted by other users in the group</p>
          <p>- Click on the message to show the full message and replies written by other users</p>
          <p>- Click the add message button to add your own message to the group</p>
          <p>- Delete messages and comments (<b>ADMIN ONLY</b> - coming soon)</p>
        </div>

        <div class="guide-step">
          <h4>Profile</h4>
          <p>- The profile page shows the current details of your user profile</p>
          <p>- Click the edit profile button to take you to a page to update your profile details</p>
      </div>

      <div class="guide-step">
          <h4>Team (ADMIN ONLY)</h4>
          <p>- The team page shows the details of all the users currently registered in the group</p>
          <p>- The page will show the name, phone number and status uf users registered</p>
      </div>

        <sl-button type="primary"  class="submit-btn" @click=${() => gotoRoute('/registerGroup')}>Got It!</sl-button>
      </div>     
      </div> 

    `
    render(template, App.rootEl)
  }
}

export default new GuideView()