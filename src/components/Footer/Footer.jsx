import Logo from '../../assets/Logo.svg'
import Icon from '../Icon/Icon'
import { contactInfo } from '../../data/contactInfo'
import { Copyright } from './Copyright/Copyright'

function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <div className="md:hidden flex flex-col items-center bg-white text-primary p-4">
          <div className="w-64 h-32 flex items-center justify-center gap-2.5">
            <img className="w-full h-full" src={Logo} alt="Logo" />
          </div>
          {contactInfo.map(({ info, icon }, i) =>
            <div key={i} className="with-icon text-primary text-xl font-normal text-center my-4">
              <Icon icon={icon} className="icon w-6 h-5 inline-flex mr-1" />
              {info}
            </div>
          )}
        </div>
        <div className="hidden md:flex h-96 relative bg-white justify-center text-primary">
          <div className="w-92 h-60 top-[24px] absolute flex-col justify-center items-center gap-16 inline-flex">
            <div className="w-full h-0.5 bg-primary border text-primary" />
            <div className="justify-start items-center gap-80 inline-flex">
              <div className="w-72 h-32 px-6 py-2.5 justify-center items-center gap-2.5 flex">
                <img className="w-64 h-32" src={Logo} alt="Logo" />
              </div>
              <div className="w-80 h-36 flow">
                {contactInfo.map(({ info, icon }, i) =>
                  <div key={i} className="w-80 h-6 with-icon">
                    <Icon icon={icon} className="icon w-6 h-5" />
                    <div className="text-blue-800 text-xl font-normal">
                      {info}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Copyright />

      </div>
    </footer>
  )
}

export default Footer
