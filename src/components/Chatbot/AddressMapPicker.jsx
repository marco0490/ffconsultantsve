import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix para el ícono de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Componente para mover el mapa cuando cambia la posición
function ChangeMapView({ coords }) {
  const map = useMap()
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 15, { duration: 1 })
    }
  }, [coords, map])
  return null
}

const AddressMapPicker = ({ onConfirm, onCancel }) => {
  const [address, setAddress] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [position, setPosition] = useState([10.4806, -66.9036]) // Caracas por defecto
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)
  const searchTimeoutRef = useRef(null)

  // Animación de escritura del placeholder
  const placeholderText = "Escribe tu dirección aquí..."
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= placeholderText.length) {
        setDisplayText(placeholderText.slice(0, index))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
        inputRef.current?.focus()
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Buscar dirección con debounce
  const searchAddress = async (query) => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }
    
    setIsSearching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}, Venezuela&limit=5`
      )
      const data = await response.json()
      setSuggestions(data)
      setShowSuggestions(data.length > 0)
    } catch (error) {
      console.error('Error buscando dirección:', error)
    }
    setIsSearching(false)
  }

  const handleAddressChange = (e) => {
    const value = e.target.value
    setAddress(value)
    
    // Debounce la búsqueda
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      searchAddress(value)
    }, 500)
  }

  const selectSuggestion = (suggestion) => {
    setAddress(suggestion.display_name)
    setPosition([parseFloat(suggestion.lat), parseFloat(suggestion.lon)])
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleConfirm = () => {
    if (address.trim()) {
      onConfirm(address)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            📍 Indica tu dirección
          </h3>
          <p className="text-blue-100 text-sm mt-1">
            Escribe tu dirección y confírmala en el mapa
          </p>
        </div>

        {/* Input de dirección */}
        <div className="p-4 relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder={isTyping ? displayText : placeholderText}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-700"
              style={{
                caretColor: isTyping ? 'transparent' : 'auto'
              }}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Sugerencias */}
          {showSuggestions && (
            <div className="absolute left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto" style={{ zIndex: 9999 }}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-2 border-b border-gray-100 last:border-0 transition-colors"
                >
                  <span className="text-blue-500">📍</span>
                  <span className="text-sm text-gray-700 line-clamp-2">{suggestion.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mapa */}
        <div className="h-64 mx-4 mb-4 rounded-xl overflow-hidden border-2 border-gray-200">
          <MapContainer
            center={position}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
            <ChangeMapView coords={position} />
          </MapContainer>
        </div>

        {/* Dirección seleccionada */}
        {address && (
          <div className="mx-4 mb-4 p-3 bg-blue-50 rounded-xl flex items-start gap-2">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-xs text-blue-600 font-medium">Dirección seleccionada:</p>
              <p className="text-sm text-gray-700">{address}</p>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="p-4 bg-gray-50 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!address.trim()}
            className="flex-1 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: address.trim() ? '#2563eb' : '#9ca3af',
              color: 'white',
              opacity: 1
            }}
          >
            <span>✓</span> Confirmar dirección
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default AddressMapPicker
