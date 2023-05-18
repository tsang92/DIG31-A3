import App from './App'
import Auth from './Auth'
import Toast from './Toast'
 
class GroupAPI {
 
  async getGroup(formData){
    // validate
    if(!formData) return
    const groupName = formData.get("group")
  
    // fetch the json data
    const response = await fetch(`${App.apiBase}/group/search/${groupName}`)
    //console.log(response)
    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)     
      throw new Error('Problem getting group')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
  
    // return data
    return data
  }

  async addMember(userId, groupId){
    // validate
    if(!userId || !groupId) return
   
    // fetch the json data
    const response = await fetch(`${App.apiBase}/group/${groupId}/add/${userId}`, {
      method: 'POST'
    })
    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)     
      throw new Error('Problem ading user to group')
    }
   
    // convert response payload into json - store as data
    const data = await response.json()
   
    // return data
    return data
  }

  // Function to get all the messages for a group
  async getGroupMessages(groupId) {
    try {
      // Make a GET request to the backend API to retrieve the messages for the group
      const response = await fetch(`${App.apiBase}/group/${groupId}/messages`)
      const messages = await response.json()

      // If the API call was successful, return the array of messages
      return messages;
    } catch (err) {
      // If an error occurred, log it to the console and return an empty array
      console.error(err)
    }
}

// Function to get all the members for a group
async getGroupMembers(groupId) {
  try {
    // Make a GET request to the backend API to retrieve the  members for the group
    const response = await fetch(`${App.apiBase}/group/${groupId}/members`)
    const members = await response.json()

    // If the API call was successful, return the array of members
    return members;
  } catch (err) {
    // If an error occurred, log it to the console and return an empty array
    console.error(err)
  }
}

async addMessage(messageId, groupId){
  // validate
  if(!messageId || !groupId) return
  // fetch the json data
  const response = await fetch(`${App.apiBase}/group/${groupId}/addMessage/${messageId}`, {
    method: 'POST'
  })
  // if response not ok
  if(!response.ok){
    // console log error
    const err = await response.json()
    if(err) console.log(err)
    // throw error (exit this function)     
    throw new Error('Problem ading user to group')
  }
 
  // convert response payload into json - store as data
  const data = await response.json()
 
  // return data
  return data
}
}
 
export default new GroupAPI()