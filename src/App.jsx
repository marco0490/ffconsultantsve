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
// import Blog from './pages/Blog/Blog'
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
import Pagar from './pages/Pagar/Pagar'
// Cotizador conversacional (wizard) — rutas anidadas bajo /cotizar
import CotizadorLayout from './pages/Cotizar/CotizadorLayout'
import Paso0Bienvenida from './pages/Cotizar/steps/Paso0Bienvenida'
import PasoMarca from './pages/Cotizar/steps/PasoMarca'
import PasoModelo from './pages/Cotizar/steps/PasoModelo'
import PasoAnio from './pages/Cotizar/steps/PasoAnio'
import PasoTipo from './pages/Cotizar/steps/PasoTipo'
import PasoValor from './pages/Cotizar/steps/PasoValor'
import PasoUso from './pages/Cotizar/steps/PasoUso'
import PasoDatos from './pages/Cotizar/steps/PasoDatos'
import PasoContacto from './pages/Cotizar/steps/PasoContacto'
import Loader from './pages/Cotizar/steps/Loader'
import Resultado from './pages/Cotizar/steps/Resultado'
// Parte 2 — emisión (E0→E6)
import EmisionRequisitos from './pages/Cotizar/emision/EmisionRequisitos'
import EmisionVehiculo from './pages/Cotizar/emision/EmisionVehiculo'
import EmisionTomador from './pages/Cotizar/emision/EmisionTomador'
import EmisionPlaft from './pages/Cotizar/emision/EmisionPlaft'
import EmisionVerificar from './pages/Cotizar/emision/EmisionVerificar'
import EmisionPago from './pages/Cotizar/emision/EmisionPago'
import EmisionEmitiendo from './pages/Cotizar/emision/EmisionEmitiendo'
import EmisionListo from './pages/Cotizar/emision/EmisionListo'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />} errorElement={<NotFound />}>
          <Route index element={<Home />} />
          {/* <Route path="/agentes" element={<Agent />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/contacto" element={<Contact />} />
          <Route path="/enviado" element={<Complete />} />
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
        </Route>

        {/* Cotizador conversacional: funnel enfocado, fuera del chrome del sitio */}
        <Route path="/cotizar" element={<CotizadorLayout />} errorElement={<NotFound />}>
          <Route index element={<Paso0Bienvenida />} />
          <Route path="marca" element={<PasoMarca />} />
          <Route path="modelo" element={<PasoModelo />} />
          <Route path="anio" element={<PasoAnio />} />
          <Route path="tipo" element={<PasoTipo />} />
          <Route path="valor" element={<PasoValor />} />
          <Route path="uso" element={<PasoUso />} />
          <Route path="datos" element={<PasoDatos />} />
          <Route path="contacto" element={<PasoContacto />} />
          <Route path="calculando" element={<Loader />} />
          <Route path="resultado" element={<Resultado />} />
          {/* Parte 2 — emisión (E0→E6) */}
          <Route path="emision">
            <Route index element={<EmisionRequisitos />} />
            <Route path="vehiculo" element={<EmisionVehiculo />} />
            <Route path="tomador" element={<EmisionTomador />} />
            <Route path="plaft" element={<EmisionPlaft />} />
            <Route path="verificar" element={<EmisionVerificar />} />
            <Route path="pago" element={<EmisionPago />} />
            <Route path="emitiendo" element={<EmisionEmitiendo />} />
            <Route path="listo" element={<EmisionListo />} />
          </Route>
        </Route>
      </>,
    ),
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
