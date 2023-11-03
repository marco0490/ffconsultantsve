import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

function Cookies() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className=" md:m-auto mb-5 mx-5 md:mt-[5rem] max-w-[800px] pt-7 lg:mt-[6rem] space-y-2">
      <Helmet>
        <title>Politica de Cookies</title>
        <meta name="title" content="Politica de Cookies" />
        <meta name="description" content="Información de nuestras cookies." />
      </Helmet>
      <h1 className="my-5 text-center text-3xl font-bold">
        Politica de Cookies
      </h1>
    </div>
  )
}

export default Cookies
