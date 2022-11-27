import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import { Login } from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Register } from './components/Register';
import { Admin } from './components/Admin';
import { AdminEditLicense } from './components/AdminEditLicense';
import { AdminEditLesson } from './components/AdminEditLesson';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path='user/login' element={<Login/>}></Route>
          <Route path='user/register' element={<Register/>}></Route>
          <Route path='admin' element={<Admin/>}></Route>
          <Route path='admin/user/:id/edit' element={<AdminEditLicense/>}></Route>
          <Route path='admin/lesson/:id/edit' element={<AdminEditLesson/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
