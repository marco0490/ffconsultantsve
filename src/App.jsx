import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Root from './components/Root/Root'
import NotFound from './pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import './App.css'
import Contact from './pages/Contact/Contact'
import We from './pages/We/We'
import Blog from './pages/Blog/Blog'
import Cotizador from './pages/Cotizador/Cotizador'
import Services from './pages/Services/Services'
import PlansMercantil from './pages/PlansMercantil/PlansMercantil'
import Agent from './pages/Agent/Agent'
import Legal from './pages/Legal/Legal'
import PlansQualitas from './pages/PlansQualitas/PlansQualitas'
import AfterCotizador from './pages/AfterCotizador/AfterCotizador'
import Complete from './pages/Complete/Complete'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<NotFound />}>
        <Route index element={<Home />} />
        {/* <Route path="/agentes" element={<Agent />} /> */}
        {/* <Route path="/blog" element={<Blog />} /> */}
        <Route path="/contacto" element={<Contact />} />
        <Route path="/enviado" element={<Complete />} />
        <Route path="/cotizador" element={<Cotizador />} />
        {/* <Route path="/envio-confirmado" element={<AfterCotizador />} /> */}
        <Route path="/planes-mercantil" element={<PlansMercantil />} />
        {/* <Route path="/planes-qualitas" element={<PlansQualitas />} /> */}
        <Route path="/legal" element={<Legal />} />
        {/* <Route path="/servicios" element={<Services />} /> */}
        {/* <Route path="/nosotros" element={<We />} /> */}
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
