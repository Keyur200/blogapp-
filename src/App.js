import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Error from './Pages/Error';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { UserContextProvider } from './UserContext';
import Create from './Pages/Create';
import PostDetailPage from './Pages/PostDetailPage';
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter >
      <UserContextProvider >
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/create' element={<Create />} />
          <Route path='/post/:id' element={<PostDetailPage />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </UserContextProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
