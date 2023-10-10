import Stepper from '../Stepper/Stepper'
import Men from '../../assets/images/image2-home.png'
import Ellipse1 from '../../assets/images/Ellipse-7.png'
import Ellipse2 from '../../assets/images/Ellipse-8.png'

function Howto() {
  return (
    <div className="bg-gray-100 mx-auto max-w-[1900px]">
      <div className="flex justify-center">
        <h2 className="md:text-4xl text-xl py-12 font-bold text-primary max-w-[700px] text-center md:pt-28 px-4">
          ¿Cómo puedes cotizar en línea tu póliza de seguro de salud?
        </h2>
      </div>
      <div className="grid md:px-32 grid-cols-1 sm:grid-cols-2 gap-8 text-center md:m-0 mx-2 ">
        <div>
          <Stepper />
        </div>
        <div className="block">
          <div className="md:relative top-20">
            <img
              src={Ellipse2}
              alt=""
              className="hidden md:block md:absolute md:-top-6 md:-left-14"
            />
            <img
              src={Ellipse1}
              alt=""
              className="hidden md:block md:absolute md:top-8"
            />
            <img src={Men} alt="" className="hidden md:block md:absolute" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Howto
