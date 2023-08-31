import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import NotFoundSVG from '../../assets/NotFound.svg'

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
      <h1 className="mx-auto mt-[5rem] pt-14 text-3xl font-bold">
        Oops, 404 Error
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-xl">
        Estamos trabajando en ellos, si quieres comunicarte con nosotros puedes
        hacerlo a través de nuestros medios en la página de contacto.
      </p>

      <div className="container m-auto mb-5  max-w-[800px] ">
        <Link to="/">
          <img className="notFound__img" src={NotFoundSVG} alt="404" />
        </Link>
      </div>
    </div>
  )
}

export default NotFound
