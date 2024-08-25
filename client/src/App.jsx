import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import AddStudent from './components/AddStudent';
import ListStudents from './components/ListStudents';
import EditStudent from './components/EditStudent';
import ViewStudent from './components/ViewStudent';

function App() {

  return (
      <div>
        {/* Routes */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ListStudents />} />
            <Route path='/add' element={<AddStudent />} />
            <Route path='/edit/:id' element={<EditStudent />} />
            <Route path='/view/:id' element={<ViewStudent />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
