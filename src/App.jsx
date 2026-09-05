import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import Root from './components/Root/Root'
import NotFound from './pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import './App.css'
import Contact from './pages/Contact/Contact'
import We from './pages/We/We'
// import Blog from './pages/Blog/Blog'
// import Cotizador from './pages/Cotizador/Cotizador'
// import Services from './pages/Services/Services'
// import Agent from './pages/Agent/Agent' // Oculto temporalmente: se reactivará en el futuro
import Legal from './pages/Legal/Legal'
import PlansReal from './pages/PlansReal/PlansReal'
import PlansCaracas from './pages/PlansCaracas/PlansCaracas'
import PlansEstar from './pages/PlansEstar/PlansEstar'
import Complete from './pages/Complete/Complete'
import Conditions from './pages/Conditions/Conditions'
import Cookies from './pages/Cookies/Cookies'
import Dynamics365Sales from './pages/Dynamics365Sales/Dynamics365Sales'
import Cotizar from './pages/Cotizar/Cotizar'
import Pagar from './pages/Pagar/Pagar'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<NotFound />}>
        <Route index element={<Home />} />
        {/* <Route path="/agentes" element={<Agent />} /> */}
        {/* <Route path="/blog" element={<Blog />} /> */}
        <Route path="/contacto" element={<Contact />} />
        <Route path="/enviado" element={<Complete />} />
        <Route path="/cotizar" element={<Cotizar />} />
        <Route path="/cotizador" element={<Navigate to="/cotizar" replace />} />
        <Route path="/dynamics-365-sales" element={<Dynamics365Sales />} />
        <Route path="/planes-real" element={<PlansReal />} />
        <Route path="/planes-caracas" element={<PlansCaracas />} />
        <Route path="/planes-estar" element={<PlansEstar />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/terminos" element={<Conditions />} />
        <Route path="/cookies" element={<Cookies />} />
        {/* <Route path="/servicios" element={<Services />} /> */}
        <Route path="/nosotros" element={<We />} />
        <Route path="/pagar" element={<Pagar />} />
      </Route>,
    ),
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
