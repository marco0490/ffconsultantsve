import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import NotFoundSVG from '../../assets/NotFound.svg'
import { AiOutlineReload } from 'react-icons/ai'

function NotFound() {
  return (
    <div className="text-center">
      <Helmet>
        <title>Oops, 404 Error</title>
        <meta name="title" content="Oops, 404 Error" />
        <meta
          name="description"
          content="Estamos trabajando en ellos, si quieres comunicarte con nosotros puedes hacerlo a través de nuestros medios en la página de contacto."
        />
      </Helmet>
      <h1 className="mx-auto mt-[5rem] pt-14 text-4xl font-bold text-blue">
        Oops, 404 Error
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-xl">
        Estamos trabajando en ellos, si quieres comunicarte con nosotros puedes
        hacerlo a través de nuestros medios en la página de contacto.
      </p>
      <Link to='/'>
        <button className="bg-primary hover:bg-purple text-white font-bold py-2 px-4 rounded-none mx-auto flex space-x-2 items-center mt-5">

          <span>Ir a inicio</span>
          <AiOutlineReload className='text-xl'/>
        </button>
      </Link>

      <div className="container mx-auto mb-5  max-w-[800px] relative -top-20">
        <Link to="/">
          <img className="notFound__img" src={NotFoundSVG} alt="404" />
        </Link>
      </div>
    </div>
  )
}

export default NotFound