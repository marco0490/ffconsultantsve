/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react'
import { FiSearch, FiCheck } from 'react-icons/fi'

// Normaliza para búsqueda insensible a mayúsculas y acentos.
function norm(s) {
  return s
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

/**
 * Select con buscador integrado que filtra en tiempo real.
 * - options: array de strings o de { value, label }.
 * - value / onChange: valor seleccionado (el `value` de la opción).
 * - placeholder: texto del buscador.
 * - emptyLabel: mensaje cuando no hay coincidencias.
 * - maxVisible: alto máximo aproximado de la lista (en nº de ítems).
 */
function StepSelectSearch({
  options = [],
  value,
  onChange,
  placeholder = 'Buscar…',
  emptyLabel = 'Sin resultados',
  autoFocus = false,
}) {
  const [query, setQuery] = useState('')

  const opts = useMemo(
    () => options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)),
    [options],
  )

  const filtradas = useMemo(() => {
    if (!query.trim()) return opts
    const q = norm(query)
    return opts.filter((o) => norm(o.label).includes(q))
  }, [opts, query])

  return (
    <div>
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full h-12 pl-10 pr-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none"
        />
      </div>

      <div className="mt-3 max-h-72 overflow-y-auto pr-1 space-y-2" role="listbox">
        {filtradas.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">{emptyLabel}</p>
        ) : (
          filtradas.map((o) => {
            const seleccionada = o.value === value
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={seleccionada}
                onClick={() => onChange(o.value)}
                className={`w-full flex items-center justify-between text-left px-4 h-12 rounded-xl border-2 transition-all ${
                  seleccionada
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                }`}
              >
                <span>{o.label}</span>
                {seleccionada && <FiCheck className="text-primary" size={18} />}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

export default StepSelectSearch
