import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import Logo from '../../assets/Logo.svg'
import SecondHeader from '../SecondHeader/SecondHeader'

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  const toggleNavbar = () => {
    setOpen(!open)
  }
  return (
    <>
      {pathname === '/' && <SecondHeader />}
      <header className="bg-white">
        <nav className="flex justify-between items-center w-[92%] mx-auto max-w-[1700px]">
          <div>
            <img className="w-56" src={Logo} alt="logo" />
          </div>
          <div
            className={`md:static absolute bg-white md:w-auto md:min-h-fit min-h-[50vh] left-0 w-full z-10 flex items-center px-5 
              ${open ? 'top-[12%]' : 'top-[-100%]'}
            `}
          >
            <ul className="flex md:flex-row flex-col items-center md:gap-[3vw] gap-6 mx-auto">
              <li className="hover:text-primary font-bold underline-offset-4 underline">
                <Link to="/">Inicio</Link>
              </li>
              <li className="hover:text-primary font-bold">
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li className="hover:text-primary font-bold">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="hover:text-primary font-bold">
                <Link to="/contacto">Contacto</Link>
              </li>
              <div className="h-[40px] min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50 hidden md:inline-block"></div>
              <li className="hover:text-primary font-bold">
                <Link to="/cotizador">
                  <button className="bg-primary hover:bg-purple text-white font-bold py-2 px-4 rounded-none">
                    Cotizar póliza
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <button onClick={toggleNavbar}>
              {open ? (
                <GrClose className="text-3xl md:hidden cursor-pointer" />
              ) : (
                <GiHamburgerMenu className="text-3xl md:hidden cursor-pointer" />
              )}
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
