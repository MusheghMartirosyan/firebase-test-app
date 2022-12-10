import { useState, useEffect } from 'react';
import './App.css';
import {db } from './firebase-config'
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore'
import { async } from '@firebase/util';


function App() {
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState('')
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: newAge})
  }
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: +age + 1 };
    updateDoc(userDoc, newFields)
  }
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
  }
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getUsers()
  }, [])

  return (
    <div className="App">
      <form onSubmit={(e) => {
        e.preventDefault()
        createUser()
      }}>
        <input onChange={(e) => {
          setNewName(e.target.value)
        }}
        type='text'
        placeholder='type your name' />
        <input onChange={(e) =>{
          setNewAge(e.target.value)
        }}
        type='number'
        placeholder='type your age' />
        <button>submit</button>
      </form>
      {console.log(users)}
      {users.map((user) => <div key={user.id}>
        <h1>name: {user.name}</h1>
        <h1>age: {user.age}</h1>
        <button onClick={() => {
          updateUser(user.id, user.age);
        }}>update age</button>
        <button onClick={() => {
          deleteUser(user.id)
        }}>delete user</button>
      </div>)}
    </div>
  );
}

export default App;
