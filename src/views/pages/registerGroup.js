import App from './../../App'
import Router, { gotoRoute } from './../../Router'
import GroupAPI from './../../GroupAPI'
import {html, render } from 'lit-html'
import Utils from './../../Utils'
import Toast from './../../Toast'
import Auth from './../../Auth'
import UserAPI from './../../UserAPI'

 
class GroupRegisterView {
  constructor() {
    this.imageSection = null;
  }

  init() {
    document.title = 'Group Register'
    this.render()
    Utils.pageIntroAnim()

    // Get the image section element
    this.imageSection = document.querySelector('.image-section');

    // Add event listener to the select element
    const selectElement = document.querySelector('sl-select[name="group"]');
    selectElement.addEventListener('sl-change', this.selectChangeHandler.bind(this));
  }

  async selectChangeHandler(event) {
    const selectedValue = event.target.value;

    // Update the background image based on the selected value
    this.imageSection.style.backgroundImage = `url('/images/${selectedValue}.jpg')`;
  }
 
  async submitHandler(e) {
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')

    try {
      const group = await GroupAPI.getGroup(formData)      
      formData.set("group", group._id)

      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)       
      await GroupAPI.addMember(Auth.currentUser._id, group._id)   
      this.user = updatedUser    
      Auth.currentUser = updatedUser
      gotoRoute('/')
    }catch(err){     
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }
 
  render() {
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
     
   
    <style>
      .split-view {
        display: flex;
        height: 100%;
        width: 100%;

      }

      .image-section {
        background-image: url('/images/sport-reg.jpg');
        background-size: cover;
        background-position: center;
      }

      .form-section,
      .image-section {
        flex: 1;
          width: 50%;
      }

      .form-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .form-signup {
        width: 75%;
      }
      

    </style>

        <div class="split-view">
       
          <div class="form-section">
 
            <sl-form class="form-signup" @sl-submit=${this.submitHandler}>
              <div class="input-group">
                <sl-select name="group" placeholder="Select sport">
                  <sl-menu-item value="AFL">AFL</sl-menu-item>
                  <sl-menu-item value="Soccer">Soccer</sl-menu-item>
                  <sl-menu-item value="Basketball">Basketball</sl-menu-item>
                  <sl-menu-item value="Tennis">Tennis</sl-menu-item>
                </sl-select>
              </div>
              <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Register</sl-button>
            </sl-form>
          </div>
          <div class="image-section"></div>
        </div>

  
    `
    render(template, App.rootEl)
  }
}
 
export default new GroupRegisterView()