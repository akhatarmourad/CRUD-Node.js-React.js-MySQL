import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function AddStudent() {

  const [data, setData] = useState(null | {});
  const navigate = useNavigate();

  const handleChange = function(event) {
    setData(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    });
  }

  const handleSubmit = async function(event) {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/students', data);
      setData(null);
      navigate('/');
      return {status: response.status, success: 'Student Added Successfully !', data: response.data};
    }
    catch(error) {
      return {error: error.message}
    }
  }

    return (
        <div className='w-1/2 mx-auto p-6 rounded-xl bg-sky-50 mt-5 shadow-md'>
          <h1 className='text-4xl text-center mb-8 text-sky-500'>Student Data Form</h1>

          <form>
            <div className='flex flex-col w-2/3 mx-auto gap-3'>
              <input className='input' placeholder='First Name' name='firstname' onChange={(event) => handleChange(event)} />
              <input className='input' placeholder='Last Name' name='lastname' onChange={(event) => handleChange(event)} />
              <input className='input' placeholder='Email' name='email' onChange={(event) => handleChange(event)} />
              <input className='input' placeholder='Password' name='password' onChange={(event) => handleChange(event)} />
            </div>

            <div className='flex w-2/3 mx-auto gap-5 mt-6 justify-center'>
              <Link className='btn bg-white border border-red-500 text-red-500' to={'/'}>Cancel</Link>
              <button className='btn' type="submit" onClick={(event) => handleSubmit(event)}>Submit</button>
            </div>
          </form>
        </div>
    );
}