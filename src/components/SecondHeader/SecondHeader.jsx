import { BiRightArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function SecondHeader() {
  return (
    <div className="hidden md:block w-full py-2 bg-primary text-white max-w-[1900px] mx-auto">
      <p className="flex justify-center">
        Compra tu seguro de salud 100% en línea.
        <Link to="/cotizador" className="flex ms-2 font-bold hover:text-purple">
          Cotiza Aquí{' '}
          <span className='inline-block'>
            <BiRightArrowAlt className="text-2xl" />
          </span>
        </Link>
      </p>
    </div>
  )
}

export default SecondHeader
