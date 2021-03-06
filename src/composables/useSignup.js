import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isPending.value = true

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Couldnt complete signup')
    }
    await res.user.updateProfile({ displayName })
    await res.user.sendEmailVerification().then(function() {
         console.log("Email sent.") 
       }).catch(function(error) {
    console.log(err.message)

    error.value = err.message
    isPending.value = false
    });
    //console.log(res.user)
    error.value = null
    isPending.value = false
    
    return res
  }
  catch(err) {
    console.log("Not signed because" + err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useSignup = () => {
  return { error, signup, isPending }
}

export default useSignup