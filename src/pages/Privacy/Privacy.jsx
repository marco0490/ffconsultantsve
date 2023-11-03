import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

function Privacy() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className=" md:m-auto mb-5 mx-5 md:mt-[5rem] max-w-[800px] pt-7 lg:mt-[6rem] space-y-2">
      <Helmet>
        <title>Politicas y Privacidad</title>
        <meta name="title" content="Politicas y Privacidad" />
        <meta
          name="description"
          content="Información de nuestras Politicas y Privacidad."
        />
      </Helmet>
      <h1 className="my-5 text-center text-3xl font-bold">
        Politicas y Privacidad
      </h1>
    </div>
  )
}

export default Privacy
