import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditStudent() {

    const [data, setData] = useState({
        ID: '',
        FIRSTNAME: '',
        LASTNAME: '',
        EMAIL: '',
        PASSWORD: ''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const id = (location.pathname.split('/'))[2];

    // Get Data
    async function getStudent(studentId) {
        try {
            const response = await axios.get(`http://localhost:5000/students/${studentId}`);
            setData(response.data[0]);
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStudent(id);
    }, [id])

    // Handle Input Change 
    const handleChange = function(event) {
        setData(prevState => {
            return {
                ...prevState,
                [event.target.name.toUpperCase()]: event.target.value
            }
        });
    }

    // Handle Save 
    const handleSave = async function(event) {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/students/${id}`, data);
            navigate('/');
            return response.json({status: response.status, data: response.data});
        }
        catch(error) {
            return {message: error.message};
        }
    }

    return (
        <div className='w-1/2 mx-auto p-6 rounded-xl bg-sky-50 mt-5 shadow-md'>
          <h1 className='text-4xl text-center mb-8 text-sky-500'>Student Details</h1>

          <form>
            <div className='flex flex-col w-2/3 mx-auto gap-3'>
              <input className='input opacity-50' readOnly={true} value={data.ID} />

              <input 
                className='input' 
                placeholder='First Name' 
                name='firstname' 
                value={data.FIRSTNAME}
                onChange={(event) => handleChange(event)} 
              />

              <input 
                className='input' 
                placeholder='Last Name' 
                name='lastname' 
                value={data.LASTNAME}
                onChange={(event) => handleChange(event)}
              />

              <input 
                className='input' 
                placeholder='Email' 
                name='email' 
                value={data.EMAIL}
                onChange={(event) => handleChange(event)}
              />

              <input 
                className='input'
                placeholder='Password' 
                name='password' 
                value={data.PASSWORD}
                onChange={(event) => handleChange(event)}
              />
            </div>

            <div className='flex w-2/3 mx-auto gap-5 mt-6 justify-center'>
              <Link className='btn bg-white border border-red-500 text-red-500' to={'/'}>Cancel</Link>
              <button className='btn' type="submit" onClick={(event) => handleSave(event)}>Save</button>
            </div>
          </form>
        </div>
    );
}