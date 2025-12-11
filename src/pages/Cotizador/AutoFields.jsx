import React from 'react'

function AutoFields({ company, product, days, years }) {
  const currentYear = new Date().getFullYear()
  const autoYears = Array.from({ length: currentYear - 1995 + 1 }, (_, i) => 1995 + i)

  const brands = [
    { value: '', label: '-Selecciona una marca-' },
    { value: '001', label: 'ACURA' },
    { value: '542', label: 'AG' },
    { value: '630', label: 'AKT' },
    { value: '002', label: 'ALFA ROMEO' },
    { value: '644', label: 'ASIAWING' },
    { value: '005', label: 'ASTON MARTIN' },
    { value: '006', label: 'AUDI' },
    { value: '116', label: 'AUTOBUSES' },
    { value: '177', label: 'AVA' },
    { value: '626', label: 'BAIC' },
    { value: '082', label: 'BAJAJ' },
    { value: '640', label: 'BAW' },
    { value: '587', label: 'BERA' },
    { value: '636', label: 'BESTUNE' },
    { value: '008', label: 'BMW' },
    { value: '010', label: 'BUICK' },
    { value: '646', label: 'BYD' },
    { value: '196', label: 'BYD AUTOS' },
    { value: '011', label: 'CADILLAC' },
    { value: '548', label: 'CAN_AM' },
    { value: '989', label: 'CARROCERIAS CORTEZ' },
    { value: '625', label: 'CF_MOTO' },
    { value: '609', label: 'CHANGAN' },
    { value: '189', label: 'CHERY' },
    { value: '013', label: 'CHEVROLET' },
    { value: '014', label: 'CHRYSLER' },
    { value: '015', label: 'CITROEN' },
    { value: '643', label: 'CYCLONE' },
    { value: '594', label: 'DAYUN' },
    { value: '648', label: 'DFSK' },
    { value: '020', label: 'DODGE' },
    { value: '528', label: 'DONGFENG' },
    { value: '021', label: 'DUCATI' },
    { value: '023', label: 'ENCAVA' },
    { value: '622', label: 'ESCUDA' },
    { value: '024', label: 'FERRARI' },
    { value: '025', label: 'FIAT' },
    { value: '026', label: 'FORD' },
    { value: '650', label: 'FORTHING' },
    { value: '620', label: 'FORZA' },
    { value: '561', label: 'FOTON' },
    { value: '653', label: 'GAC' },
    { value: '142', label: 'GEELY' },
    { value: '606', label: 'GENESIS' },
    { value: '028', label: 'GMC' },
    { value: '186', label: 'GREAT WALL MOTORS' },
    { value: '589', label: 'HAOJIN' },
    { value: '582', label: 'HAOJUE' },
    { value: '029', label: 'HARLEY_DAVIDSON' },
    { value: '125', label: 'HINO' },
    { value: '657', label: 'HJM_HJ' },
    { value: '030', label: 'HONDA' },
    { value: '031', label: 'HYUNDAI' },
    { value: '185', label: 'IKCO' },
    { value: '032', label: 'INFINITI' },
    { value: '603', label: 'INTERCAR' },
    { value: '034', label: 'INTERNATIONAL' },
    { value: '035', label: 'ISUZU' },
    { value: '036', label: 'IVECO' },
    { value: '519', label: 'JAC' },
    { value: '037', label: 'JAGUAR' },
    { value: '038', label: 'JEEP' },
    { value: '629', label: 'JETOUR' },
    { value: '106', label: 'JIALING' },
    { value: '545', label: 'JMC' },
    { value: '639', label: 'KAIYI' },
    { value: '039', label: 'KAWASAKI' },
    { value: '651', label: 'KAYO' },
    { value: '559', label: 'KEEWAY' },
    { value: '040', label: 'KIA' },
    { value: '152', label: 'KTM' },
    { value: '163', label: 'KYMCO' },
    { value: '506', label: 'KYOTO' },
    { value: '042', label: 'LAMBORGHINI' },
    { value: '044', label: 'LAND ROVER' },
    { value: '659', label: 'LEILONG' },
    { value: '045', label: 'LEXUS' },
    { value: '046', label: 'LINCOLN' },
    { value: '598', label: 'LONCIN' },
    { value: '048', label: 'MACK' },
    { value: '049', label: 'MASERATI' },
    { value: '623', label: 'MAXUS' },
    { value: '050', label: 'MAZDA' },
    { value: '604', label: 'MCLAREN' },
    { value: '051', label: 'MERCEDES BENZ' },
    { value: '146', label: 'MG' },
    { value: '053', label: 'MINI' },
    { value: '654', label: 'MISHOZUKI' },
    { value: '055', label: 'MITSUBISHI' },
    { value: '615', label: 'MOTOS_BEL' },
    { value: '655', label: 'MURASAKI' },
    { value: '056', label: 'NISSAN' },
    { value: '058', label: 'OPEL' },
    { value: '060', label: 'PEUGEOT' },
    { value: '061', label: 'PIAGGIO' },
    { value: '064', label: 'PORSCHE' },
    { value: '614', label: 'POWER_G' },
    { value: '617', label: 'RALVIA' },
    { value: '597', label: 'RAM' },
    { value: '634', label: 'RELY' },
    { value: '083', label: 'REMOLQUES' },
    { value: '065', label: 'RENAULT' },
    { value: '111', label: 'RIO' },
    { value: '509', label: 'SAIPA' },
    { value: '556', label: 'SENKE' },
    { value: '511', label: 'SHINERAY' },
    { value: '549', label: 'SINOTRUK' },
    { value: '504', label: 'SKYGO' },
    { value: '642', label: 'SM_SANTILLANA' },
    { value: '647', label: 'SOUEAST' },
    { value: '072', label: 'SUBARU' },
    { value: '184', label: 'SUMO' },
    { value: '073', label: 'SUZUKI' },
    { value: '176', label: 'SYM' },
    { value: '569', label: 'TESLA' },
    { value: '638', label: 'TORO' },
    { value: '240', label: 'TORO' },
    { value: '074', label: 'TOYOTA' },
    { value: '075', label: 'TRIUMPH' },
    { value: '522', label: 'TVS' },
    { value: '573', label: 'UFO' },
    { value: '194', label: 'UNICO' },
    { value: '155', label: 'UNITED MOTORS' },
    { value: '641', label: 'VEFASE' },
    { value: '178', label: 'VENTO' },
    { value: '632', label: 'VENUCIA' },
    { value: '637', label: 'VOGE' },
    { value: '078', label: 'VOLKSWAGEN' },
    { value: '157', label: 'WULING' },
    { value: '080', label: 'YAMAHA' },
    { value: '172', label: 'YINGANG' },
    { value: '568', label: 'YUTONG' },
    { value: '534', label: 'ZHONGXING' },
    { value: '162', label: 'ZONGZHEN' },
  ]

  const shouldShowAuto =
    product === 'auto' &&
    (company === 'seguros-piramide' || company === 'seguros-oceanica')

  if (!shouldShowAuto) return null

  return (
    <>
      {/* Campos de vehículo para Automóvil Piramide/Oceanica */}
      <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 md:space-x-2 mt-4">
        <div className="flex flex-col col-span-2">
          <label htmlFor="vehiculo_ano" className="hidden">
            Año
          </label>
          <select name="vehiculo_ano" id="vehiculo_ano" required>
            <option value="" disabled selected>
              Año del vehículo
            </option>
            {autoYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="vehiculo_marca" className="hidden">
            Marca
          </label>
          <select name="vehiculo_marca" id="vehiculo_marca" required>
            {brands.map((b) => (
              <option key={b.value || 'placeholder'} value={b.value} selected={b.value === ''}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 md:space-x-2 mt-4">
        <div className="flex flex-col col-span-2">
          <label htmlFor="vehiculo_modelo" className="hidden">
            Modelo
          </label>
          <input
            type="text"
            name="vehiculo_modelo"
            id="vehiculo_modelo"
            placeholder="Modelo"
            autoComplete="off"
            required
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="vehiculo_version" className="hidden">
            Versión
          </label>
          <input
            type="text"
            name="vehiculo_version"
            id="vehiculo_version"
            placeholder="Versión"
            autoComplete="off"
            required
          />
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="vehiculo_transmision" className="hidden">
          Transmisión
        </label>
        <select name="vehiculo_transmision" id="vehiculo_transmision" required>
          <option value="" disabled selected>
            Tipo de transmisión
          </option>
          <option value="manual">Manual</option>
          <option value="automatica">Automática</option>
          <option value="sincronica">Sincrónica</option>
          <option value="otra">Otra</option>
        </select>
      </div>

      <div className="flex items-center gap-4 mt-4 text-gray-700 text-sm font-semibold">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name="blindaje"
            value="Si"
            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <span>Blindaje</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name="cero_km"
            value="Si"
            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <span>0 KM</span>
        </label>
      </div>
    </>
  )
}

export default AutoFields
