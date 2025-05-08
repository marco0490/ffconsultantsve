import { Link } from 'react-router-dom'
import MercantilLogo from '../../assets/images/MercantilLogo.PNG'
import QualitasLogo from '../../assets/images/QualitasLogo.PNG'
import { BiRightArrowAlt } from 'react-icons/bi'

function CompaniesPlan() {
  return (
    <div className="grid md:px-32 grid-cols-1 sm:grid-cols-2 gap-8 text-center mx-2 md:pt-28 max-w-[1900px]">
      <div>
        <img
          src={MercantilLogo}
          alt="Logo Mercantil"
          className="mx-auto my-12"
        />
        <p className="max-w-[600px] mx-auto">
          Mercantil Seguros cuenta con una trayectoria de 30 años en el mercado
          asegurador, ha logrado ganarse la confianza de los venezolanos.
          <Link
            to="/planes-mercantil"
            className="flex justify-end mt-6 text-primary font-bold hover:text-purple"
          >
            Ver planes y servicios <BiRightArrowAlt className="text-2xl" />
          </Link>
        </p>
      </div>
      <div>
        <img src={QualitasLogo} alt="Logo Qualitas" className="mx-auto my-12" />
        <p className="max-w-[600px] mx-auto">
          Empresa de referencia en el mercado asegurador venezolano, basados en
          la excelencia de sus productos y servicios, comprometidos con la
          tranquilidad y el bienestar de sus asegurados.
          <Link
            to="/planes-qualitas"
            className="flex justify-end mt-6 text-primary font-bold hover:text-purple"
          >
            Ver planes y servicios <BiRightArrowAlt className="text-2xl" />
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CompaniesPlan
