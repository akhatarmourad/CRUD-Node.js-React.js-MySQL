import { Link } from 'react-router-dom';

export default function ControlBtns() {

    const handleDisplay = function() {
        window.location.reload(); 
    }

    return (
        <div className='w-1/2 my-5 flex justify-between mx-auto'>
            <Link className='btn bg-green-500' onClick={() => handleDisplay()}>Display All</Link>
            <button className='btn bg-red-500'>Delete All</button>
            <Link className='btn bg-violet-500' to={'/add'}>Add One</Link>
        </div>
    );
}