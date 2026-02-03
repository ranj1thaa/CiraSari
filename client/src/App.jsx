import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Intro from './pages/introduction/Intro'
import Login from './components/auth/Login'
import { ToastContainer } from 'react-toastify'
import Signup from './components/auth/Signup';
import WorkerDashboard from './components/dashboard/worker/WorkerDashboard';
import CustomerDashboard from './components/dashboard/customer/CustomerDashboard';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PublicRoute from './components/publicRoute/PublicRoute';
import AppShell from './components/appShell/AppShell';
import Contact from './pages/contact/Contact';
import AllUserOnlyProtect from './components/protectedRoute/AllUserOnlyProtect';
import SareeMakingDashboard from './pages/sareeMaking/SareeMakingDashboard';
import InfotainmentHome from './pages/community/InfotainmentHome';
import SareeCollection from './pages/marketplace/SareeCollection';
import AddSaree from './pages/marketplace/AddSaree';
import EditSaree from './components/saree/EditSaree';
import SareeDetail from './components/saree/SareeDetail';
import WorkerPublicProfile from './pages/worker/WorkerPublicProfile';
import Cart from './pages/marketplace/Cart';
import WorkerOrders from './pages/marketplace/WorkerOrders';
import CustomerOrders from './pages/marketplace/CustomerOrders';
import StripeCheckoutWrapper from './components/payment/StripeCheckoutWrapper';
import WorkerMySareeCollection from './components/saree/workerMySareeCollection';



function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute><Intro/></PublicRoute>}/>
          <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
          <Route path='/worker/dashboard' element={<ProtectedRoute requiredRole="worker"><AppShell><WorkerDashboard/></AppShell></ProtectedRoute>}/>
          <Route path='/customer/dashboard' element={<ProtectedRoute requiredRole="customer"><AppShell><CustomerDashboard/></AppShell></ProtectedRoute>}/>      
          <Route path='/sareeMaking' element={<AllUserOnlyProtect><AppShell><SareeMakingDashboard/></AppShell></AllUserOnlyProtect>}/>
          <Route path='/infotainment' element={<AllUserOnlyProtect><AppShell><InfotainmentHome/></AppShell></AllUserOnlyProtect>}/>
          <Route path='/contact' element={<AllUserOnlyProtect><AppShell><Contact/></AppShell></AllUserOnlyProtect>}/>

          <Route path='/saree-collections' element={<AllUserOnlyProtect><AppShell><SareeCollection/></AppShell></AllUserOnlyProtect>}/>
          <Route path='/add-saree' element={<ProtectedRoute requiredRole="worker"><AppShell><AddSaree/></AppShell></ProtectedRoute>}/>
          <Route path='/edit-saree/:id' element={<ProtectedRoute requiredRole="worker"><AppShell><EditSaree/></AppShell></ProtectedRoute>}/>
          <Route path='/my-saree' element={<ProtectedRoute requiredRole="worker"><AppShell><WorkerMySareeCollection/></AppShell></ProtectedRoute>}/>
          <Route path='/detail-saree/:id' element={<AllUserOnlyProtect><AppShell><SareeDetail/></AppShell></AllUserOnlyProtect>}/>
          
          <Route path="/worker/:id" element={<AllUserOnlyProtect><AppShell><WorkerPublicProfile /></AppShell></AllUserOnlyProtect>}/>
          <Route path="/my-cart" element={<ProtectedRoute requiredRole="customer"><AppShell><Cart /></AppShell></ProtectedRoute>}/>
          <Route path="/worker/orders" element={ <ProtectedRoute requiredRole="worker"> <AppShell><WorkerOrders /></AppShell></ProtectedRoute>}/>
          <Route path="/customer/orders" element={ <ProtectedRoute requiredRole="customer"> <AppShell><CustomerOrders/></AppShell> </ProtectedRoute>}/>
          <Route path="/checkout/:orderId" element={<ProtectedRoute requiredRole='customer'><AppShell><StripeCheckoutWrapper/></AppShell></ProtectedRoute>} />

        </Routes>
     </BrowserRouter>
     <ToastContainer/>
    </>
  )
}

export default App
