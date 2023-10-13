import { Fragment } from 'react'
import Logo from '../../assets/Logo.svg'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import Icon from '../Icon/Icon'
import { contactInfo } from '../../data/contactInfo'

function Footer() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <>
      <div className="md:hidden flex flex-col items-center bg-white text-primary p-4">
        <div className="w-64 h-32 flex items-center justify-center gap-2.5">
          <img className="w-full h-full" src={Logo} alt="Logo" />
        </div>
        <div className="text-primary text-xl font-normal text-center my-4">
          <FaRegClock className="w-6 h-5 inline-flex mr-1" />
          Lun-Vie: 8:00 am - 5:00 pm
        </div>
        <a
          href="mailto:ffconsultants124@outlook.com?subject=Consulta enviada desde WEB"
          className="text-primary text-xl font-normal text-center my-4"
        >
          <AiOutlineMail className="w-6 h-5 inline-flex mr-1" />
          ffconsultants124@outlook.com
        </a>
        <div className="text-primary text-xl font-normal text-center my-4">
          <FiMapPin className="w-6 h-5 inline-flex mr-1" />
          Caracas, Venezuela
        </div>
        <div className="text-primary text-xl font-normal text-center my-4">
          <BsTelephoneForward className="w-6 h-5 inline-flex mr-1" />
          +58 212-2675132 / 412-9713806
        </div>
        <div className="w-full h-0.5 bg-primary border text-primary my-4" />
        <div className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Link to="/">Inicio</Link>
        </div>
        <div className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Link to="/servicios">Servicios</Link>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
            Planes
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-15 -top-24 z-10 mt-2 w-38 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/planes-mercantil"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Mercantil
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/planes-qualitas"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Qualitas
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Link to="/nosotros">Nosotros</Link>
        </div>
        <div className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Link to="/agentes">Agentes</Link>
        </div>
        <div className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Link to="/legal">Políticas y Privacidad</Link>
        </div>
        <div className="opacity-50 text-primary text-sm text-center my-4 font-normal">
          Copyright © 2023 • Future Financial Consultants C.A.
        </div>
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
        <div className="h-11 top-[324px] absolute flex-col justify-center items-center gap-6 inline-flex">
          <div className="w-[80%] h-px opacity-20 bg-blue-800 border" />
          <div className="justify-start items-start gap-80 inline-flex">
            <div className="justify-start items-start gap-10 flex">
              <div className="text-primary hover:text-purple text-base font-light">
                <Link to="/">Inicio</Link>
              </div>
              <div className="text-primary hover:text-purple text-base font-light">
                <Link to="/servicios">Servicios</Link>
              </div>
              <div className="text-primary hover:text-purple text-base font-light">
                <Link to="/agentes">Agentes</Link>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="text-primary hover:text-purple text-base font-light">
                  Planes
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-15 -top-24 z-10 mt-2 w-38 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/planes-mercantil"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Mercantil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/planes-qualitas"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Qualitas
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <div className="text-primary hover:text-purple text-base font-light">
                <Link to="/nosotros">Nosotros</Link>
              </div>
              <div className="text-primary hover:text-purple text-base font-light">
                <Link to="/legal">Políticas y Privacidad</Link>
              </div>
            </div>
            <div className="opacity-50 text-blue-800 text-sm font-normal">
              Copyright © 2023 • Future Financial Consultants C.A.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
