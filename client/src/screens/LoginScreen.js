import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import Error from '../components/Error'; 


function LoginScreen() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading] = useState(false);
  const [error,seterror] = useState()

  async function login (){
   
      const user = {
        email,
        password,
      }
      try{
        
        setloading(true)
        const result = (await axios.post('http://localhost:5000/api/users/login', user )).data;
        console.log(user.email)
        setloading(false)

        localStorage.setItem('currentUser' , JSON.stringify(result));
        //console.log(currentUser)
        window.location.href = '/home'

      }
      catch(e){
        console.log(e)
        setloading(false);
        seterror(true) 
      }
    
  }

  return (
    <div>

    {loading && (<Loader/>)}
      <div className="row justify-content-center mt-5">
       <div className="col-md-5">
        {error && (<Error message={'Invalid Credentials'}/>)}
        <div className='bs'>
          <p className='cee'>Login</p>
         
          <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
          <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
           <button className='btn btn-primary mt-3' onClick={login}> Login </button>
        </div>
        
        </div>
      </div>
    </div>
  )
}

export default LoginScreen


