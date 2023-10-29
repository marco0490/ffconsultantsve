import { TestimonalCard } from './TestimonialCard/TestimonialCard'

function Testimonials() {
  return (
    <section className="testimonial-section region mx-auto flow">
      <div className="wrapper" data-wrapper="xlarge">
        <h2 className="text-2xl font-medium text-primary">Testimonios</h2>
        <p className="md:text-[3rem] text-primary font-bold text-2xl">
          Nuestros clientes nos recomiendan...
        </p>
      </div>

      <div className="wrapper">
        <div className="testimonials auto-grid">
          {testimonials.map(({ content, user, rating }, i) => {
            return <TestimonalCard rating={rating} user={user} key={i}>
              {content}
            </TestimonalCard>
          })}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

const testimonials = [
  {
    rating: 4,
    user: {
      picture: 'https://randomuser.me/api/portraits/women/3.jpg',
      name: 'Rebeca Barroeta',
      role: 'Cliente Mercantil'
    },
    content: 'Excelente plataforma de servicios, nunca había sido tal fácil asegurar tu salud'
  },
  {
    rating: 4,
    user: {
      picture: 'https://randomuser.me/api/portraits/women/21.jpg',
      name: 'Rina Torrealba',
      role: 'Agente de Seguros'
    },
    content: 'Gracias a esta plataforma mi cartera de clientes aumentó un porcentaje considerable'
  },
  {
    rating: 5,
    user: {
      picture: 'https://randomuser.me/api/portraits/men/83.jpg',
      name: 'Carlos Colmenares',
      role: 'Cliente Qualitas'
    },
    content: 'Responsables y atentos a todos mis requerimientos a cualquier hora del día, muy confiables'
  },
]