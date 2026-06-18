import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { FiUser, FiCreditCard, FiCheck, FiAlertCircle, FiClock, FiShield, FiArrowRight } from 'react-icons/fi'

// Datos de ejemplo de pólizas (en producción vendría de Supabase)
const polizasEjemplo = {
  '12345678': {
    nombre: 'Juan Pérez',
    cedula: 'V-12345678',
    poliza: 'RCV-2024-001234',
    producto: 'RCV Vehículos',
    aseguradora: 'Real Seguros',
    vehiculo: 'Toyota Corolla 2022',
    placa: 'AB123CD',
    deuda: 42.00,
    vencimiento: '15/06/2026',
  },
  '18736393': {
    nombre: 'María González',
    cedula: 'V-18736393',
    poliza: 'AP-2024-005678',
    producto: 'Accidentes Personales',
    aseguradora: 'Seguros Pirámide',
    deuda: 48.00,
    vencimiento: '20/05/2026',
  },
}

// Datos bancarios para el pago
const datosBancarios = {
  banco: 'Banco Mercantil',
  cuenta: '0105-0123-45-1234567890',
  tipo: 'Corriente',
  titular: 'Future Financial Consultants, C.A.',
  rif: 'J-30492843-2',
  concepto: 'Pago de Póliza',
}

function Pagar() {
  const [step, setStep] = useState(1)
  const [tipoDoc, setTipoDoc] = useState('V')
  const [cedula, setCedula] = useState('')
  const [poliza, setPoliza] = useState(null)
  const [montoSeleccionado, setMontoSeleccionado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [linkGenerado, setLinkGenerado] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const buscarPoliza = async () => {
    if (!cedula) return
    
    setLoading(true)
    // Simular búsqueda en base de datos
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const polizaEncontrada = polizasEjemplo[cedula]
    setPoliza(polizaEncontrada || null)
    setStep(2)
    setLoading(false)
  }

  const seleccionarMonto = (tipo) => {
    setMontoSeleccionado(tipo)
    setStep(3)
    
    // Simular generación de link
    setTimeout(() => {
      setLinkGenerado(true)
    }, 1000)
  }

  const generarLinkPago = () => {
    // En producción esto generaría un link real de pasarela de pago
    const monto = montoSeleccionado === 'total' ? poliza?.deuda : (poliza?.deuda || 50)
    return `https://pago.example.com/ffc/${Date.now()}?monto=${monto}`
  }

  const fechaExpiracion = () => {
    const hoy = new Date()
    return `${hoy.getDate().toString().padStart(2, '0')}/${(hoy.getMonth() + 1).toString().padStart(2, '0')}/${hoy.getFullYear()}`
  }

  const horaExpiracion = () => {
    return '11:59 p.m.'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Helmet>
        <title>Pagar Póliza | FFC</title>
        <meta name="description" content="Paga tu póliza de seguros de forma rápida y segura" />
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <FiShield className="text-primary text-2xl" />
            <span className="font-bold text-white text-lg">FFC</span>
          </Link>
          <span className="text-slate-400 text-sm">Pago Seguro</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Chat Container */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="p-6 space-y-6">
            
            {/* Mensaje inicial del bot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <FiShield className="text-white" />
              </div>
              <div className="bg-slate-700/50 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                <p className="text-white font-medium mb-2">
                  Para pagar con <span className="text-primary">Débito Inmediato</span>, selecciona el tipo de documento de identidad:
                </p>
              </div>
            </motion.div>

            {/* Step 1: Seleccionar tipo de documento */}
            <AnimatePresence mode="wait">
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Selector de tipo */}
                  <div className="bg-white rounded-xl p-4">
                    <label className="block text-gray-500 text-sm mb-2">Tipo de documento</label>
                    <select 
                      value={tipoDoc}
                      onChange={(e) => setTipoDoc(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={step > 1}
                    >
                      <option value="V">Cédula (V)</option>
                      <option value="E">Extranjero (E)</option>
                      <option value="J">RIF (J)</option>
                    </select>
                  </div>

                  {/* Bot pide número */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <FiUser className="text-white" />
                    </div>
                    <div className="bg-slate-700/50 rounded-2xl rounded-tl-none p-4">
                      <p className="text-white font-medium">
                        Indícame tu número de documento:
                      </p>
                      <p className="text-slate-400 text-sm mt-1">Usa solo números.</p>
                    </div>
                  </div>

                  {/* Input de cédula */}
                  <div className="bg-white rounded-xl p-4">
                    <label className="block text-gray-500 text-sm mb-2">Documento de identidad:</label>
                    <input
                      type="text"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value.replace(/\D/g, ''))}
                      placeholder="12345678"
                      className="w-full p-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                      disabled={step > 1}
                    />
                  </div>

                  {step === 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={buscarPoliza}
                      disabled={!cedula || loading}
                      className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Buscando...
                        </>
                      ) : (
                        'Enviar'
                      )}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 2: Mostrar resultado de búsqueda */}
            <AnimatePresence mode="wait">
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {poliza ? (
                    <>
                      {/* Póliza encontrada */}
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="text-white" />
                        </div>
                        <div className="bg-slate-700/50 rounded-2xl rounded-tl-none p-4 space-y-2">
                          <p className="text-white">
                            <span className="text-green-400">✓</span> La póliza asociada es: <span className="font-bold text-primary">{poliza.poliza}</span>
                          </p>
                          <p className="text-white">
                            <span className="text-green-400">✓</span> Producto: <span className="font-semibold">{poliza.producto}</span> - {poliza.aseguradora}
                          </p>
                          <p className="text-white flex items-center gap-2">
                            <FiAlertCircle className="text-red-400" />
                            Tu deuda es: <span className="font-bold text-red-400">${poliza.deuda.toFixed(2)}</span>
                          </p>
                        </div>
                      </div>

                      {/* Opciones de monto */}
                      {step === 2 && (
                        <div className="bg-slate-700/50 rounded-xl p-4">
                          <p className="text-white text-center mb-4">
                            ¿Deseas pagar el total de tu deuda o un monto mayor?
                          </p>
                          <div className="flex gap-3 justify-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => seleccionarMonto('total')}
                              className="px-6 py-3 bg-primary text-white font-bold rounded-full"
                            >
                              Monto total
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => seleccionarMonto('mayor')}
                              className="px-6 py-3 bg-white text-primary font-bold rounded-full border-2 border-primary"
                            >
                              Monto mayor
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Sin póliza - ofrecer cotizar */}
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                          <FiAlertCircle className="text-white" />
                        </div>
                        <div className="bg-slate-700/50 rounded-2xl rounded-tl-none p-4 space-y-3">
                          <p className="text-white">
                            No encontramos pólizas activas asociadas a la cédula <span className="font-bold">{tipoDoc}-{cedula}</span>
                          </p>
                          <p className="text-slate-300">
                            ¿Deseas cotizar una nueva póliza?
                          </p>
                          <Link
                            to="/cotizar"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all"
                          >
                            Cotizar ahora
                            <FiArrowRight />
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Link de pago generado */}
            <AnimatePresence mode="wait">
              {step >= 3 && poliza && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <FiCheck className="text-white" />
                    </div>
                    <div className="bg-slate-700/50 rounded-2xl rounded-tl-none p-4 space-y-3">
                      <p className="text-white font-medium flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        ¡Tu link de pago está listo! Pasos a seguir:
                      </p>
                      <ol className="text-slate-300 space-y-2 text-sm">
                        <li><span className="font-bold text-white">1.</span> Haz clic en Pagar.</li>
                        <li><span className="font-bold text-white">2.</span> Selecciona tu banco y método (Teléfono/Cuenta).</li>
                        <li><span className="font-bold text-white">3.</span> Ingresa los datos del titular y confirma con el código SMS/Email.</li>
                      </ol>
                      
                      <div className="flex items-center gap-2 text-yellow-400 text-sm mt-4">
                        <FiClock />
                        Este enlace expira hoy, <span className="font-bold">{fechaExpiracion()}</span> a las <span className="font-bold">{horaExpiracion()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Resumen de pago */}
                  <div className="bg-white rounded-xl p-5 space-y-3">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <FiCreditCard className="text-primary" />
                      Resumen de Pago
                    </h3>
                    <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Póliza:</span>
                        <span className="font-semibold text-gray-800">{poliza.poliza}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Producto:</span>
                        <span className="font-semibold text-gray-800">{poliza.producto}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Titular:</span>
                        <span className="font-semibold text-gray-800">{poliza.nombre}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                        <span className="text-gray-700 font-bold">Monto a pagar:</span>
                        <span className="font-bold text-primary text-xl">${poliza.deuda.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Datos bancarios */}
                  <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600">
                    <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                      🏦 Datos para Transferencia
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Banco:</span>
                        <span className="font-semibold text-white">{datosBancarios.banco}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cuenta:</span>
                        <span className="font-semibold text-white font-mono">{datosBancarios.cuenta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tipo:</span>
                        <span className="font-semibold text-white">{datosBancarios.tipo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Titular:</span>
                        <span className="font-semibold text-white">{datosBancarios.titular}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">RIF:</span>
                        <span className="font-semibold text-white">{datosBancarios.rif}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Concepto:</span>
                        <span className="font-semibold text-white">{poliza.poliza}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botón de pagar */}
                  {linkGenerado && (
                    <motion.a
                      href={generarLinkPago()}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl text-center text-lg shadow-lg shadow-green-500/30 transition-all"
                    >
                      Ir a pagar 🚀
                    </motion.a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Pago seguro procesado por Future Financial Consultants</p>
          <p className="mt-1">¿Necesitas ayuda? <Link to="/contacto" className="text-primary hover:underline">Contáctanos</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Pagar
