import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Employee(props) {
  return(
    <div className='Employee'>
      <img className='Avatar' src={props.employee.image} alt='avatar' />
      <p className='FullName'>{props.employee.lname} {props.employee.fName}</p>
      <p className='TitleDepartment'>{props.employee.title} @ {props.employee.department}</p>
      <p className='Email'>{props.employee.email}</p>
      <p className='Phone'>{props.employee.phone}</p>
    </div>
  )
}


function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then((response) => {
        setEmployees(response.data);
      })
    }, []);

    const employeeItems = employees.map((employee, index) => 
      <Employee key={index} employee={employee} />
    );

  return (
    <div className="App">
      {employeeItems}
    </div>
  );
}

export default App;
