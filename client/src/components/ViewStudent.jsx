import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import photo from '../assets/photo.jpg';


export default function ViewStudent() {

    const [student, setStudent] = useState({
        ID: '',
        FIRSTNAME: '',
        LASTNAME: '',
        EMAIL: '',
        PASSWORD: ''
    });

    // Get ID
    const {id} = useParams();

    async function fetchStudent(studentId) {
        try {
            const response = await axios.get(`http://localhost:5000/students/${studentId}`);
            setStudent(response.data[0]);
        }
        catch(error) {
            return {message: error.message};
        }
    }

    // Get Data
    useEffect(() => {
        fetchStudent(id);
    });

    return (
        <div className='bg-slate-50 w-1/2 mx-auto mt-6 p-5 rounded-xl border border-gray-200'>
            <h1 className="text-3xl text-center text-gray-500">Student Details</h1>

            <div className='my-5 flex items-center justify-between'>
                {/* Table of Informations */}
                <table role="presentation" className='w-2/3'>
                    <tr className='tr'>
                        <td className='td'>ID</td>
                        <td className='td'>{student.ID}</td>
                    </tr>
                    <tr className='tr'>
                        <td className='td'>First Name</td>
                        <td className='td'>{student.FIRSTNAME}</td>
                    </tr>
                    <tr className='tr'>
                        <td className='td'>Last Name</td>
                        <td className='td'>{student.LASTNAME}</td>
                    </tr>
                    <tr className='tr'>
                        <td className='td'>Email</td>
                        <td className='td'>{student.EMAIL}</td>
                    </tr>
                </table>

                {/* Image */}
                <div>
                    <img src={photo} alt='Student Profile' className='w-48 rounded-full' />
                </div>
            </div>

            <div className='text-center mt-10 mb-2'>
                <Link to={'/'} className='bg-gray-300 border border-gray-400 text-gray-500 px-4 py-2 rounded-lg'>Dismiss View</Link>
            </div>
        </div>
    );
}