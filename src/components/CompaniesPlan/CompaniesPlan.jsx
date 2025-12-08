import { useNavigate } from 'react-router-dom';

function CompaniesPlan() {
  const navigate = useNavigate();

  const handleLogoClick = (company) => {
    // Navegar a la sección correspondiente según la compañía
    switch(company) {
      case 'qualitas':
        // Navegar a la ruta de planes-qualitas
        navigate('/planes-qualitas');
        break;
      case 'piramide':
        // Navegar a la ruta de planes-piramide
        navigate('/planes-piramide');
        break;
      // Agregar más casos para otras compañías cuando sea necesario
      default:
        break;
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {/* PRIMERA VUELTA */}
        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('caracas')}
            className="focus:outline-none"
          >
            <img
              src="https://www.seguroscaracas.com/wp-content/uploads/2025/05/Logo-Seguros-Caracas.webp"
              alt="Seguros Caracas"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>
        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('qualitas')}
            className="focus:outline-none"
          >
            <img
              src="https://www.seguros-qualitas.com/wp-content/uploads/2020/06/Logo-Qualitas_slogan-01.png"
              alt="Qualitas"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>

        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('piramide')}
            className="focus:outline-none"
          >
            <img
              src="https://segurospiramide.com/static/logo-piramides-d07524ef35db8b8403dff1b54884e9aa.svg"
              alt="Piramide Seguros"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>

        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('hispana')}
            className="focus:outline-none"
          >
            <img
              src="https://hispana.com.ve/wp-content/uploads/2022/08/cropped-hispana-logo.png"
              alt="Seguros Hispana"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>

        {/* SEGUNDA VUELTA (para efecto infinito) */}
        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('caracas')}
            className="focus:outline-none"
          >
            <img
              src="https://www.seguroscaracas.com/wp-content/uploads/2025/05/Logo-Seguros-Caracas.webp"
              alt="Seguros Caracas"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>

        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('hispana')}
            className="focus:outline-none"
          >
            <img
              src="https://hispana.com.ve/wp-content/uploads/2022/08/cropped-hispana-logo.png"
              alt="Seguros Hispana"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>
        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('qualitas')}
            className="focus:outline-none"
          >
            <img
              src="https://www.seguros-qualitas.com/wp-content/uploads/2020/06/Logo-Qualitas_slogan-01.png"
              alt="Qualitas"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>
        <div className="carousel-item">
          <button 
            onClick={() => handleLogoClick('piramide')}
            className="focus:outline-none"
          >
            <img
              src="https://segurospiramide.com/static/logo-piramides-d07524ef35db8b8403dff1b54884e9aa.svg"
              alt="Piramide Seguros"
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompaniesPlan
