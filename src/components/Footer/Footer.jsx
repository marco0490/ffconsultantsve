import Logo from '../../assets/Logo.svg'
import { FaRegClock } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { BsTelephoneForward } from 'react-icons/bs'

function Footer() {
  return (
    <div className="h-96 relative bg-white flex justify-center text-primary">
      <div className="w-92 h-60 top-[24px] absolute flex-col justify-center items-center gap-16 inline-flex">
        <div className="w-full h-0.5 bg-primary border text-primary" />
        <div className="justify-start items-center gap-80 inline-flex">
          <div className="w-72 h-32 px-6 py-2.5 justify-center items-center gap-2.5 flex">
            <img className="w-64 h-32" src={Logo} />
          </div>
          <div className="w-80 h-36 relative">
            <div className="w-80 h-6 left-0 top-0 absolute">
              <div className="left-[30px] top-0 absolute text-blue-800 text-xl font-normal">
                Lun-Vie: 8:00 am -5:00 pm
              </div>
              <FaRegClock className="w-6 h-5 left-0 top-[3px] absolute flex-col justify-start items-start inline-flex" />
            </div>
            <div className="w-80 h-6 left-[0.74px] top-[39px] absolute">
              <div className="left-[29.26px] top-0 absolute text-blue-800 text-xl font-normal">
                futurefc@example.com
              </div>
              <AiOutlineMail className="w-6 h-5 left-0 top-[3px] absolute flex-col justify-start items-start inline-flex" />
            </div>
            <div className="w-80 h-6 left-[0.74px] top-[119px] absolute">
              <div className="left-[29.26px] top-0 absolute text-blue-800 text-xl font-normal">
                Caracas, Venezuela
              </div>
              <FiMapPin className="w-6 h-5 left-0 top-[3px] absolute flex-col justify-start items-start inline-flex" />
            </div>
            <div className="w-80 h-6 left-[0.74px] top-[78px] absolute">
              <div className="left-[29.26px] top-0 absolute text-blue-800 text-xl font-normal">
                +58 212-2675132 / 412-9713806
              </div>
              <BsTelephoneForward className="w-6 h-5 left-0 top-[7px] absolute flex-col justify-start items-start inline-flex" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-11 top-[324px] absolute flex-col justify-center items-center gap-6 inline-flex">
        <div className="w-[80%] h-px opacity-20 bg-blue-800 border" />
        <div className="justify-start items-start gap-80 inline-flex">
          <div className="justify-start items-start gap-10 flex">
            <div className="text-blue-800 text-base font-light">Inicio</div>
            <div className="text-blue-800 text-base font-light">Servicios</div>
            <div className="text-blue-800 text-base font-light">Planes</div>
            <div className="text-blue-800 text-base font-light">Nosotros</div>
            <div className="text-blue-800 text-base font-light">
              Políticas y Privacidad
            </div>
          </div>
          <div className="opacity-50 text-blue-800 text-sm font-normal">
            Copyright © 2023 • Future Financial Consultants C.A.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer