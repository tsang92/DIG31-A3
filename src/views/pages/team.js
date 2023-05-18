import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'
import Toast from './../../Toast'
import GroupAPI from './../../GroupAPI'
import UserAPI from './../../UserAPI'

class TeamView {
  init(){
    console.log('TeamView.init')
    document.title = 'Team'   
    this.getGroupMembers() 
    this.render()    
    Utils.pageIntroAnim()
  }

  async getGroupMembers(){
    try {
      const user = await UserAPI.getUser(Auth.currentUser._id)
      const members = await GroupAPI.getGroupMembers(user.group) 
      const tableEl = document.createElement('table');
      tableEl.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
        </tr>`;
  
      members.forEach(member => {
        const rowEl = document.createElement('tr');
        rowEl.innerHTML = `
          <td>${member.firstName} ${member.lastName}</td>
          <td>${member.email}</td>
          <td>${member.phone}</td>
          <td>${member.status}</td>`;
        tableEl.appendChild(rowEl);
      });
  
      const resultsEl = document.querySelector('#result');
      resultsEl.appendChild(tableEl);

    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render() {
    const template = html`

    <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    td, th {
      border: 1px solid  var(--brand-color);
      text-align: center;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color:  var(--sl-color-secondary-400)
    }
    </style>

      <va-app-header title="Team" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">      
        <div class="content"> 
        <h1 class="brand-color">Team</h1>
     
        <div id="result"> </div>
    
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new TeamView()