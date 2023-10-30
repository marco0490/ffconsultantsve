import Stepper from '../Stepper/Stepper'
import Executive from '../../assets/images/executive.png';

function Howto() {
  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="flex justify-center">
        <h2 className="md:text-4xl text-xl py-12 font-bold text-primary max-w-[700px] text-center md:pt-28 px-4">
          ¿Cómo puedes cotizar en línea tu póliza de seguro de salud?
        </h2>
      </div>
      <div className="stepper wrapper auto-grid">
        <div>
          <Stepper />
        </div>
        <div className="md:block hidden">
          <img
            src={Executive}
            alt=""
            className='max-w-none absolute bottom-0 h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Howto
