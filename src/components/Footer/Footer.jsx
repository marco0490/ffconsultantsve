import Logo from '../../assets/Logo.svg'
import Icon from '../Icon/Icon'
import { contactInfo } from '../../data/contactInfo'
import { Copyright } from './Copyright/Copyright'

function Footer() {
  return (
    <>
      <hr className="w-[calc(93vw-2rem)] max-w-[64rem] mx-auto bg-primary h-[1px]" />
      <footer>
        <div className="footer-info wrapper region" data-wrapper="narrow">
          <img aria-hidden="true" className="block w-full max-w-[256px] mx-auto" src={Logo} alt="Logo" />
          <div className='flex flex-col flow'>
            {contactInfo.map(({ info, icon }, i) =>
              <div key={i} className="with-icon text-primary text-xl font-normal text-center">
                <Icon icon={icon} className="icon w-6 h-5 inline-flex mr-1" />
                {info}
              </div>
            )}
          </div>
        </div>
        <div className="wrapper" data-wrapper="large">
          <Copyright />
        </div>
      </footer>
    </>
  )
}

export default Footer
