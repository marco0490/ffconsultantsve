import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'
import { FadeUpSection, FadeUpItem } from '../FadeUp/FadeUp'

function AvatarImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative h-12 w-12 rounded-full flex-shrink-0">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
      <img
        className={`h-12 w-12 rounded-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

const testimonials = [
  {
    stars: [FaStar, FaStar, FaStar, FaStar, FaStarHalfAlt],
    text: '"Excelente plataforma de servicios, nunca había sido tal fácil asegurar tu salud"',
    name: 'Rebeca Barroeta',
    role: 'Cliente Piramide',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    stars: [FaStar, FaStar, FaStar, FaStar, FaRegStar],
    text: '"Gracias a esta plataforma mi cartera de clientes aumentó un porcentaje considerable"',
    name: 'Rina Torrealba',
    role: 'Agente de Seguros',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    stars: [FaStar, FaStar, FaStar, FaStar, FaStar],
    text: '"Responsables y atentos a todos mis requerimientos a cualquier hora del día, muy confiables"',
    name: 'Carlos Colmenares',
    role: 'Cliente Oceanica',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

function Testimonials() {
  return (
    <div className="container mx-auto p-4 md:pt-28">
      <FadeUpSection>
        <FadeUpItem>
          <h2 className="text-2xl font-medium text-primary">Testimonios</h2>
        </FadeUpItem>
        <FadeUpItem>
          <p className="md:text-[3rem] text-primary font-bold text-2xl">
            Nuestros clientes nos recomiendan...
          </p>
        </FadeUpItem>
      </FadeUpSection>

      <FadeUpSection className="grid md:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {testimonials.map(({ stars, text, name, role, avatar }) => (
          <FadeUpItem key={name}>
            <motion.div
              className="bg-white p-4 rounded shadow-md h-full"
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex gap-1 text-yellow-400 text-xl">
                {stars.map((Star, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="text-gray-500 my-6">{text}</p>
              <div className="flex flex-shrink-0 mb-4 items-center">
                <AvatarImage src={avatar} alt={name} />
                <div className="ms-2">
                  <p className="text-primary font-bold">{name}</p>
                  <p className="font-semibold">{role}</p>
                </div>
              </div>
            </motion.div>
          </FadeUpItem>
        ))}
      </FadeUpSection>
    </div>
  )
}

export default Testimonials
