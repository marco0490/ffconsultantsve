import { useState } from 'react'

function Dynamics365Sales() {
  const [status, setStatus] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    console.log('>>> Enviando a Power Automate desde Dynamics365Sales')

    const formData = new FormData(e.target)

    const day = formData.get('titular_dia')
    const monthName = formData.get('titular_mes')
    const year = formData.get('titular_anio')

    const monthMap = {
      enero: 0,
      febrero: 1,
      marzo: 2,
      abril: 3,
      mayo: 4,
      junio: 5,
      julio: 6,
      agosto: 7,
      septiembre: 8,
      octubre: 9,
      noviembre: 10,
      diciembre: 11,
    }

    let fechaNacimientoIso = null

    if (day && monthName && year && monthMap[monthName] !== undefined) {
      const dateObj = new Date(
        Number(year),
        monthMap[monthName],
        Number(day),
        0,
        0,
        0,
      )
      fechaNacimientoIso = dateObj.toISOString()
    }

    const data = {
      NombreCompleto: formData.get('name'),
      Telefono: formData.get('mobile'),
      CorreoElectronico: formData.get('email'),
      FechaNacimiento: fechaNacimientoIso,
      Sexo: formData.get('gender'),
      CompaniaAseguradora: formData.get('aseguradora'),
    }

    fetch(
      'https://70819f504490ecc695be32d38329fd.e1.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d726397078a24769abbdb929d4e75263/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jQdHR1WDCrkvkkq-MfOKoiQ2aKfOaWKXfPjP0ydRCEc',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => {
        if (response.ok) {
          setStatus('ok')
          e.target.reset()
        } else {
          setStatus('error')
        }
      })
      .catch((error) => {
        console.error('Error de conexión con Power Automate:', error)
        setStatus('error')
      })
  }

  return (
    <div className="max-w-[600px] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dynamics 365 Sales - Test</h1>
      <p className="mb-4 text-sm text-gray-600">
        Esta página es solo para pruebas directas de la integración con Dynamics 365
        Sales a través de Power Automate.
      </p>
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="aseguradora"
          placeholder="Compañía aseguradora"
          required
          className="border p-2"
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          required
          className="border p-2"
        />
        <div className="flex space-x-2">
          <select name="titular_dia" className="border p-2 w-1/3" required>
            <option value="" disabled selected>
              D
            </option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select name="titular_mes" className="border p-2 w-1/3" required>
            <option value="" disabled selected>
              M
            </option>
            <option value="enero">Enero</option>
            <option value="febrero">Febrero</option>
            <option value="marzo">Marzo</option>
            <option value="abril">Abril</option>
            <option value="mayo">Mayo</option>
            <option value="junio">Junio</option>
            <option value="julio">Julio</option>
            <option value="agosto">Agosto</option>
            <option value="septiembre">Septiembre</option>
            <option value="octubre">Octubre</option>
            <option value="noviembre">Noviembre</option>
            <option value="diciembre">Diciembre</option>
          </select>
          <select name="titular_anio" className="border p-2 w-1/3" required>
            <option value="" disabled selected>
              A
            </option>
            {Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i).map(
              (y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ),
            )}
          </select>
        </div>
        <select name="gender" className="border p-2" required>
          <option value="" disabled selected>
            Sexo
          </option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          className="border p-2"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Teléfono"
          required
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-4 mt-2"
        >
          Enviar a Dynamics 365
        </button>
      </form>
      {status === 'ok' && (
        <p className="mt-3 text-green-600 text-sm">
          Datos enviados correctamente a Power Automate / Dataverse.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-3 text-red-600 text-sm">
          Hubo un error al enviar los datos.
        </p>
      )}
    </div>
  )
}

export default Dynamics365Sales
