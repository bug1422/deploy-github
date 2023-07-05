import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserHome } from './screens/common/components/Home';
import { SignUp } from './screens/auth/components/SignUp';
import { SignIn } from './screens/auth/components/SignIn';
import { AdminHome } from './screens/admin/components/AdminHome';
import { UserManagement } from './screens/admin/components/UserManagement';
import { RevenueManagement } from './screens/admin/components/RevenueManagement';
import { PostListManagement } from './screens/admin/components/PostListManagement';
import { PostDetail } from './screens/admin/components/Post';
import { ReportList } from './screens/admin/components/ReportList';
import { Admin } from './screens/admin/Admin';
function App() {
  return (
   <div className='container'>
    <BrowserRouter basename='/'>
      <Routes>
        <Route exact path='/deploy-github' element={<UserHome/>}></Route>
        <Route path='/auth/login' element={<SignIn/>}></Route>
        <Route path='/auth/register' element={<SignUp/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/admin/admin-home' element={<AdminHome/>}></Route>
        <Route path='/admin/user-management' element={<UserManagement/>}></Route>
        <Route path='/admin/revenue' element={<RevenueManagement/>}></Route>
        <Route path='/admin/post-list' element={<PostListManagement/>}></Route>
        <Route path='/admin/post' element={<PostDetail/>}></Route>
        <Route path='/admin/report-list' element={<ReportList/>}></Route>

      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
