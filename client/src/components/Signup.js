import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2,setPassword2] = React.useState('')
    const navigate = useNavigate()
    const handleNameChange = (e) =>{
        setName(e.target.value)
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }
    const handlePasswordChange2 = (e) =>{
        setPassword2(e.target.value)
    }

    const registerUser = (e) => {
        const url = 'http://localhost:5002/api/account'
        const data = {
            name,
            password
        }
        console.log(data)
        e.preventDefault()
        const register = (url, data) => {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(data)
            })
            .then(res=>res.json())
            .then(data=>{
                navigate('/login')
            })
            .catch(err=>console.log(err))
          }
          if(password===password2){
            register(url, data)
            return
          } else{
            alert("Passwords do not match")
            return
          }
    }
    
    
  return (
    <div className="place-items-center">
        <form onSubmit={registerUser}>
            <div>
                <label htmlFor="name">Name:</label>
                <input name="name" type="text" id="name" value={name} onChange={handleNameChange}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" id="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <label htmlFor="password2">Confirm Password:</label>
                <input name="password2" type="password" id="password2" value={password2} onChange={handlePasswordChange2}/>
            </div>
            <div>
                <button type='submit'>Register</button>
            </div>
            <div>
                <p><Link to="/login">Login</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Signup