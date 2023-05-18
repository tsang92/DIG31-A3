import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  render(){
    const template = html`
   
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content">      
      <div class="content">    
        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`
        <style>
        .select__label {
          color: black;
        }

        p  {
          text-align: center;
        }
    
        </style>
        <h1 class="brand-color">Edit Profile</h1>
          <sl-form class="page-form" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>
            <div class="input-group">
              <sl-input label="First Name" type="text" name="firstName" value="${this.user.firstName}"></sl-input>
            </div>
            <div class="input-group">
              <sl-input label="Last Name" type="text" name="lastName" value="${this.user.lastName}" ></sl-input>
            </div>
            <div class="input-group">
              <sl-input label="Email" type="text" name="email" value="${this.user.email}"></sl-input>
            </div>    
            <div class="input-group">
              <sl-input label="Phone" type="number" name="phone" value="${this.user.phone}"></sl-input>
            </div>   
            <div class="input-group">
            <sl-select checked="true" label="Status" name="status" value="${this.user.status}">
            <sl-menu-item  value="Avaliable">Avaliable</sl-menu-item>
                <sl-menu-item  value="Unavaliable">Unavaliable</sl-menu-item>
                <sl-menu-item  value="Unknown">Unknown</sl-menu-item>
            </sl-select>

          </div>        
            <div class="input-group">
              <label>Avatar</label><br>          
              ${(this.user.avatar) ? html`
                <sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>
                <input type="file" name="avatar" />
              `: html`
                <input type="file" name="avatar" />
              `}
            </div>
            <sl-button type="primary" class="submit-btn" submit>Update Profile</sl-button>
          </sl-form>
          <p  ><a href="/profile" @click=${anchorRoute}>Go Back</a></p>
        `}
        </div>
        </div>
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()