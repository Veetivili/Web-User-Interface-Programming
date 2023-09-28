//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {auth, firebaseConfig} from './components/firebase';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function Banner() {
return(
  <h1>Todo Example with React</h1>
)
}

function ToDoFormAndList() {
  // Declare state variables
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

   // load todo list items
   useEffect(() => {
    const fetchData = async () => {
      // connect todos collection
      const todosCol = collection(db, 'todos');
      const todoSnapshot = await getDocs(todosCol);
      // todo text and id 
      // document id is unique, so it can be used with deleting todo
      const todos = todoSnapshot.docs.map(doc => {
        return  { 
          text: doc.data().text,
          id: doc.id 
        };
      });
      // set states
      console.log(todos);
      setItems(todos);
      setLoading(false);
    }
    // start loading data
    console.log("fetch data...")
    fetchData();
  },[]); // called only once

  // add todo
const handleSubmit = async (event) => {
  // prevent normal submit event
  event.preventDefault();
  // add item to Firebase
  let newItem =  { text: itemText };
  const docRef = await addDoc(collection(db, "todos"), newItem);
  // get added doc id and set id to newItem
  newItem.id = docRef.id;
  // update states in App
  setItems( [...items, newItem]);
  // modify newItem text to ""
  setItemText("")
}

const removeItem = (item) => {
  // delete from firebase
  deleteDoc(doc(db, "todos", item.id));
  // delete from items state and update state
  let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
  setItems(filteredArray); 
}


  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
        <input type='submit' value='Add'/>
      </form>
      <ul>
      { loading  && 
        <p>Loading...</p>
      }
      {items.map(item => (
        <li key={item.id}>
          {item.text+" "} <span onClick={() => removeItem(item)}> x </span>
        </li>
      ))}
    </ul>    
    </div>
  )
}

function App() {

  return (
    <div>
      <Banner />
      <ToDoFormAndList />
    </div>
  );
}


export default App;