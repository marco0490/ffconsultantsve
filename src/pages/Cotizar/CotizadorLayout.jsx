import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CotizadorProvider, useCotizadorState } from '../../components/Cotizador/useCotizadorState'

// Variantes de deslizamiento horizontal según la dirección de navegación.
const variants = {
  enter: (dir) => ({ x: dir >= 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? -64 : 64, opacity: 0 }),
}

function Shell() {
  const location = useLocation()
  const { direction } = useCotizadorState()

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Elemento de la ruta top-level /cotizar: provee el estado y el shell con transiciones.
function CotizadorLayout() {
  return (
    <CotizadorProvider>
      <Shell />
    </CotizadorProvider>
  )
}

export default CotizadorLayout
