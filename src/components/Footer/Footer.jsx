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
    <div className="flex flex-col items-center bg-white text-primary p-4 max-w-[1100px] mx-auto">
      <div className="w-full h-0.5 bg-primary my-4" />
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="w-64 h-32 flex md:mt-6 md:col-start-1 mx-auto">
          <img className="w-full h-full" src={Logo} alt="Logo" />
        </div>

        <div className="flex flex-col col-start-3">
          {contactInfo.map(({ info, icon }, i) => (
            <div
              key={i}
              className="with-icon text-primary text-xl font-normal text-center my-4 md:my-2"
            >
              <Icon icon={icon} className="icon w-6 h-5 inline-flex mr-1" />
              {info}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-0.5 bg-primary border text-primary my-4" />
      <div className="md:flex md:flex-cols md:space-x-12">
        <div className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Link to="/">Inicio</Link>
        </div>
        <div className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Link to="/servicios">Servicios</Link>
        </div>

        <Menu as="div" className="relative text-primary text-xl font-normal text-center my-4 hover:text-purple">
          <Menu.Button>
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
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="text-primary text-xl font-normal text-center my-4 hover:text-purple">
            Politicas y Legal
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
            <Menu.Items className="absolute right-15 -top-28 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/privacidad"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Politicas y Privacidad
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/legal"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Aviso Legal
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/cookies"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      Politicas de Cookies
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="opacity-50 text-primary text-sm text-center my-4 font-normal max-w-[400px] lg:max-w-[700px]">
        Publicidad aprobada por SUADEASEG a Oliver Sierra CS-4171 & FFC bajo el
        codigo TVP XXXX-XXX Publicidad aprobada por la SUDEASEG bajo el código
        TVP-2022-0063-TVP-2023-0048. Copyright © 2023 • Future Financial
        Consultants C.A.
      </div>
    </div>
  )
}

export default Footer
