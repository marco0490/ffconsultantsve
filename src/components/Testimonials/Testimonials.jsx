import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

function Testimonials() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-medium text-primary">Testimonios</h2>
      <p className="text-[3rem] text-primary font-bold">
        Nuestros clientes nos recomiendan...
      </p>
      <div className="grid md:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex gap-1 text-yellow-400 text-xl">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <p className="text-gray-500 my-6">
            “Excelente plataforma de servicios, nunca había sido tal fácil
            asegurar tu salud”
          </p>
          <div className="flex flex-shrink-0 mb-4">
            <img
              className="h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="ms-2">
              <p className="text-primary font-bold">Rebeca Barroeta</p>
              <p className="font-semibold">Cliente Mercantil</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex gap-1 text-yellow-400 text-xl">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
          <p className="text-gray-500 my-6">
          “Gracias a esta plataforma mi cartera de clientes aumentó un porcentaje considerable”
          </p>
          <div className="flex flex-shrink-0 mb-4">
            <img
              className="h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="ms-2">
              <p className="text-primary font-bold">Rina Torrealba</p>
              <p className="font-semibold">Agente de Seguros</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex gap-1 text-yellow-400 text-xl">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p className="text-gray-500 my-6">
          “Responsables y atentos a todos mis requerimientos a cualquier hora del día, muy confiables”
          </p>
          <div className="flex flex-shrink-0 mb-4">
            <img
              className="h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="ms-2">
              <p className="text-primary font-bold">Carlos Colmenares</p>
              <p className="font-semibold">Cliente Qualitas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
