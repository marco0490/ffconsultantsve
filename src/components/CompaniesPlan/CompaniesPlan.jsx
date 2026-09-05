import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FadeUpSection, FadeUpItem } from '../FadeUp/FadeUp'
import LogoRealSeguros from '../../assets/images/LogoRealSeguros.png'

function LogoImg({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative flex items-center justify-center" style={{ minWidth: 80, height: 70 }}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`max-h-full max-w-[180px] object-contain transition-all duration-300 ${loaded ? '' : 'opacity-0'}`}
      />
    </div>
  )
}

const logos = [
  { key: 'real', src: LogoRealSeguros, alt: 'Real Seguros' },
  {
    key: 'caracas',
    src: 'https://www.seguroscaracas.com/wp-content/uploads/2025/05/Logo-Seguros-Caracas.webp',
    alt: 'Seguros Caracas',
  },
  {
    key: 'estar',
    src: 'https://www.estarseguros.com/wp-content/uploads/elementor/thumbs/logo-ES-1-rfkestximjkzzw4brz8rab33wv0pp4mdq1869yi42o.png',
    alt: 'Estar Seguros',
  },
]

function CompaniesPlan() {
  const navigate = useNavigate()

  const handleLogoClick = (company) => {
    switch (company) {
      case 'real': navigate('/planes-real'); break
      case 'caracas': navigate('/planes-caracas'); break
      case 'estar': navigate('/planes-estar'); break
      default: break
    }
  }

  return (
    <div className="py-8">
      <FadeUpSection className="text-center mb-8">
        <FadeUpItem>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Respaldados por las Mejores Aseguradoras
          </h2>
        </FadeUpItem>
        <FadeUpItem>
          <p className="text-gray-500 text-sm md:text-base">
            Trabajamos con empresas líderes del mercado para ofrecerte la mejor protección
          </p>
        </FadeUpItem>
      </FadeUpSection>

      <div className="carousel-container">
        <div className="carousel-track">
          {/* Primera vuelta */}
          {logos.map(({ key, src, alt }) => (
            <div key={`a-${key}`} className="carousel-item">
              <button onClick={() => handleLogoClick(key)} className="focus:outline-none">
                <LogoImg src={src} alt={alt} />
              </button>
            </div>
          ))}
          {/* Segunda vuelta para efecto infinito */}
          {logos.map(({ key, src, alt }) => (
            <div key={`b-${key}`} className="carousel-item">
              <button onClick={() => handleLogoClick(key)} className="focus:outline-none">
                <LogoImg src={src} alt={alt} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompaniesPlan
