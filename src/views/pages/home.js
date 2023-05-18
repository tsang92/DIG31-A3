import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
    <style>
		body {
			margin: 0;
			padding: 0;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		
		.wrapper {
			display: flex;
			height: 100%;
			justify-content: center;
			align-items: center;
		}
		
		.box {
			position: relative;
			width: 50%;
			height: 100%;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			filter: grayscale(100%);
			transition: filter 0.5s ease;
			cursor: pointer;
		}
		
		.box:first-of-type {
			background-image: url("/images/home1.jpg");
		}
		
		.box:last-of-type {
			background-image: url("/images/home2.jpg");
		}
		
		.box:hover {
			filter: grayscale(0%);
		}

		.btn {
      width: 150px;
			position: absolute;
			bottom: 2em;
			left: 50%;
			transform: translateX(-50%);
			color: black;
			border: none;
			cursor: pointer;
			font-size: 16px;
			font-weight: bold;
			transition: all 0.3s ease;
		}

		.btn:hover {
			background-color: black;
			color: white;
		}
	</style>

      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
  
      <div class="wrapper">
	  ${(Auth.currentUser.accessLevel == 1) ? html`
	  <div class="box"  @click=${()=> gotoRoute('/profile')}">
      <sl-button type="primary" class="btn" >Profile</sl-button>
      </div>
              `: html`
			  <div class="box"  @click=${()=> gotoRoute('/team')}">
			  <sl-button type="primary" class="btn" >Team</sl-button>
			  </div>
              `}
      
      <div class="box"  @click=${()=> gotoRoute('/messageBoard')}">
      <sl-button type="primary" class="btn" >Message Board</sl-button>
      </div>
    </div>
        
           
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()