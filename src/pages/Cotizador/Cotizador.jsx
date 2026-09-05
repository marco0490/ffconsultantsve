import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import ChatbotEmbedded from '../../components/Chatbot/ChatbotEmbedded'
import { FiShield, FiClock, FiHeadphones, FiCheckCircle } from 'react-icons/fi'

function Cotizador() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const benefits = [
    {
      icon: <FiShield size={24} />,
      title: 'Seguro y Confiable',
      description: 'Tus datos están protegidos con encriptación de nivel bancario',
    },
    {
      icon: <FiClock size={24} />,
      title: 'Cotización Inmediata',
      description: 'Obtén tu cotización en menos de 5 minutos',
    },
    {
      icon: <FiHeadphones size={24} />,
      title: 'Soporte 24/7',
      description: 'Nuestro chatbot te asiste a cualquier hora del día',
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: 'Sin Compromiso',
      description: 'Cotiza gratis y sin obligación de compra',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Cotiza tu Seguro en Línea | FFC Consultants</title>
        <meta
          name="title"
          content="Cotiza tu Seguro en Línea | FFC Consultants"
        />
        <meta
          name="description"
          content="Cotiza tu seguro de auto, salud, vida u hogar en minutos con nuestro asistente virtual MaxProtect. Rápido, fácil y sin compromiso."
        />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="w-full py-12 px-4"
        style={{ 
          background: 'linear-gradient(135deg, #3146b4 0%, #4f46e5 50%, #6366f1 100%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Cotiza tu Seguro en Línea
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Nuestro asistente virtual <strong>MaxProtect</strong> te guiará paso a paso 
            para encontrar el seguro perfecto para ti
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Benefits Sidebar - Desktop */}
          <div className="hidden lg:block space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Por qué cotizar con nosotros?
            </h2>
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div 
                  className="p-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#3146b4', color: '#ffffff' }}
                >
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}

            {/* Trust Indicators */}
            <div className="mt-8 p-6 rounded-xl bg-gray-50 border">
              <h3 className="font-bold text-gray-800 mb-4">Aseguradoras Aliadas</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white rounded-full text-sm border">Real Seguros</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm border">Estar Seguros</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm border">Seguros Caracas</span>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                +1,000 clientes satisfechos en Venezuela
              </p>
            </div>
          </div>

          {/* Chatbot - Main Area */}
          <div className="lg:col-span-2">
            <div className="sticky top-4">
              <ChatbotEmbedded />
              
              {/* Mobile Benefits */}
              <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-white shadow-md text-center"
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ backgroundColor: '#3146b4', color: '#ffffff' }}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-sm text-gray-800">{benefit.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: '#3146b4' }}>
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                style={{ backgroundColor: '#3146b4', color: '#ffffff' }}
              >
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Inicia la conversación</h3>
              <p className="text-gray-600">
                Escribe en el chat qué tipo de seguro necesitas
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                style={{ backgroundColor: '#3146b4', color: '#ffffff' }}
              >
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Responde las preguntas</h3>
              <p className="text-gray-600">
                MaxProtect te guiará con preguntas sencillas
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                style={{ backgroundColor: '#3146b4', color: '#ffffff' }}
              >
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Recibe tu cotización</h3>
              <p className="text-gray-600">
                Un asesor te contactará con las mejores opciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cotizador
