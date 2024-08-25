import { useState, useEffect } from 'react';
import axios from 'axios';
import ControlBtns from './ControlBtns';
import { GoEye } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function ListStudents() {

    const [students, setStudents] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:5000/students');
            setStudents(response.data);
        }
        catch(error) {
            console.log(error);
        }
    }

   useEffect(() => {
      fetchData()
   });

   // Delete a Student by ID
   const handleDelete = async function(id) {
      try {
        const response = await axios.delete(`http://localhost:5000/students/${id}`);
        return {status: response.status, data: response.data};
      }
      catch(error) {
        return {message: error.message};
      }
   }

    return (
        <div>
            <ControlBtns />
            
            <hr />

            <div className='w-2/3 mx-auto mt-5 rounded-2xl overflow-hidden border shadow-sm'>
                <table className='w-full'>
                    <thead className='text-left'>
                        <tr className='border-b bg-slate-100 pr-3'>
                            <th className='py-2 pl-4'>#</th>
                            <th className='py-2'>ID</th>
                            <th className='py-2'>Full Name</th>
                            <th className='py-2'>Email</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            students.length > 0 ? (students.map((student, index) => {
                                return (
                                    <tr key={student.index} className='border-b last:border-b-0 hover:bg-slate-50'>
                                        <td className='py-2 pl-4 text-gray-500'>{index + 1}</td>
                                        <td className='py-2 text-gray-500'>{student.ID}</td>
                                        <td className='py-2 text-gray-500'>{student.LASTNAME + ' ' + student.FIRSTNAME}</td>
                                        <td className='py-2 text-gray-500'>{student.EMAIL}</td>
                                        <td className='py-2 text-gray-500 flex gap-3'>
                                            <Link to={`/view/${student.ID}`}><GoEye className='text-xl hover:text-sky-400 cursor-pointer' /></Link>
                                            <Link to={`/edit/${student.ID}`}><FiEdit className='text-xl hover:text-yellow-400 cursor-pointer' /></Link>
                                            <AiOutlineDelete className='text-xl hover:text-red-400 cursor-pointer' onClick={() => handleDelete(student.ID)} />
                                        </td>
                                    </tr>
                                )
                            })) : (
                                <tr className="text-gray-500 px-3 py-2 rounded-xl">
                                    <td colSpan={5} className='p-3 text-center text-xl'>No students found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}