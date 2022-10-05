import instance from '../../services/api'
import { useEffect, useState } from 'react';

import './styles.css';

function Main() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users,setUsers] = useState([])

   async function loadUsers(){
    try {
      const response = await instance.get('/users')
      setUsers(response.data)
    } catch (error) {
      
    }
   } 

 async function handleSubmit(e){
  e.preventDefault()
  try {
    if (!name||!email){
      console.log("preencha os campos")
      return
    }
    const response = await instance.post ('/users',{
       email:email,
       name:name
    })
    console.log(response.data)
    setEmail('')
    setName('')
    loadUsers()
  } catch (error) {
    console.log(error)
    
  }
}

useEffect(()=>{
  loadUsers()
},[])

  return (
    <div className='container-form'>
      <form className='square' onSubmit={handleSubmit}>
        <input
        name='name'
        type="text"
        placeholder='Name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

<input
        name='email'
        type="text"
        placeholder='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <button>cadastrar</button>
      </form>

      <div key={users.id} className='users'>
        <h1> users</h1>
        <div>
          {users.map((user)=>(
            <h3 key={user.id}>{user.name}</h3>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
