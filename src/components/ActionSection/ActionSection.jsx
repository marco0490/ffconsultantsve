import { Link } from 'react-router-dom'
import Pareja from '../../assets/images/image1-home.png'
import { BiRightArrowAlt } from 'react-icons/bi'

function ActionSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center mx-auto max-w-[1900px]">
      <div className='md:text-left md:ps-44 md:pt-16'>
        <h2 className="text-blue text-2xl md:text-5xl font-bold md:drop-shadow-xl">
          Protege a tu familia con las mejores soluciones digitales en pólizas
          de seguros de salud.
        </h2>
        <p className="py-8 max-w-[400px]">
          Con Future Financial Consultants, puedes cotizar una póliza de salud
          en línea, comparar diferentes opciones y elegir la que mejor se adapte
          a tus necesidades y presupuesto.
        </p>
        <button className="bg-primary hover:bg-purple text-white font-bold py-3 px-5 rounded-none">
          <Link to="/cotizador">
            <span>Cotizar póliza</span>
            <span className="inline-block ps-3 text-xl relative top-1">
              <BiRightArrowAlt />
            </span>
          </Link>
        </button>
      </div>
      <div className="w-full md:relative left-44">
        <img src={Pareja} alt="Foto de pareja" />
      </div>
    </div>
  )
}

export default ActionSection
