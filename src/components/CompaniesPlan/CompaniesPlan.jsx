import { Link } from 'react-router-dom'
import MercantilLogo from '../../assets/images/MercantilLogo.svg'
import QualitasLogo from '../../assets/images/QualitasLogo.svg'
import { BiRightArrowAlt } from 'react-icons/bi'

function CompaniesPlan() {
  return (
    <div className="wrapper region">
      <div className="plans auto-grid">
        <card className="stack max-w-[37.5rem]">
          <img
            src={MercantilLogo}
            alt="Logo Mercantil"
            className="mx-auto my-12"
          />
          <p className="mx-auto mb-auto">
            Mercantil Seguros cuenta con una trayectoria de 30 años en el mercado
            asegurador, ha logrado ganarse la confianza de los venezolanos.
          </p>
          <Link to="/planes-mercantil" className='flex justify-end mt-6 text-primary font-bold hover:text-purple'>Ver planes y servicios <BiRightArrowAlt className='text-2xl' /></Link>
        </card>
        <card className="stack max-w-[37.5rem]">
          <img src={QualitasLogo} alt="Logo Qualitas" className="mx-auto my-12" />
          <p className="mx-auto mb-auto">
            Empresa de referencia en el mercado asegurador venezolano, basados en
            la excelencia de sus productos y servicios, comprometidos con la
            tranquilidad y el bienestar de sus asegurados.
          </p>
          <Link to="/planes-qualitas" className='flex justify-end mt-6 text-primary font-bold hover:text-purple'>Ver planes y servicios <BiRightArrowAlt className='text-2xl' /></Link>
        </card>
      </div>
    </div>
  )
}

export default CompaniesPlan
