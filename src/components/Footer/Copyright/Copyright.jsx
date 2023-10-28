import { Link } from 'react-router-dom'

export const Copyright = () => {
  return (
    <>
      <hr className="max-w-[64rem] mx-auto bg-primary h-[1px]" />
      <div className="repel text-primary py-6">
        <nav className="cluster gap-x-8 gap-y-3 font-light ">
          {copyrightLinks.map(({ name, url }, i) => {
            return <Link className='hover:text-purple' key={i} to={url}>{name}</Link>
          })}
        </nav>
        <p className="opacity-50 text-sm font-normal">Copyright © 2023 • Future Financial Consultants C.A.</p>
      </div>
    </>
  )
}

const copyrightLinks = [
  {
    name: 'Inicio',
    url: '/',
  },
  {
    name: 'Servicios',
    url: '/servicios',
  },
  {
    name: 'Agentes',
    url: '/agentes',
  },
  {
    name: 'Planes',
    url: '',
  },
  {
    name: 'Nosotros',
    url: '/nosotros',
  },
  {
    name: 'Politicas y Privacidad',
    url: 'legal',
  }
]