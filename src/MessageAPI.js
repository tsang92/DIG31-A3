import App from './App'
import Auth from './Auth'
import Toast from './Toast'
 
class MesssageAPI {
 
  async getMessage(messageId){
    // validate
    if(!messageId) return

    // fetch the json data
    const response = await fetch(`${App.apiBase}/message/${messageId}`)

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

  async addMessage(formData){
    // validate
    if(!formData) return

    // fetch the json data
    const response = await fetch(`${App.apiBase}/message`, {
      method: 'POST',      
      body: formData
    })

    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)     
      throw new Error('Problem adding message')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
  
    // return data
    return data
  }

  async addComment(formData, messageId){
    // validate
    if(!formData || !messageId) return


    // fetch the json data
    const response = await fetch(`${App.apiBase}/message/${messageId}`, {
      method: 'POST',      
      body: formData
    })

    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)     
      throw new Error('Problem adding message')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
  
    // return data
    return data
  }
}
 
export default new MesssageAPI()