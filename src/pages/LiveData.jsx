import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Thermometer, Zap, Activity, UploadCloud, RefreshCw } from 'lucide-react'

function LiveData({ updateState }) {
  const navigate = useNavigate()
  const [data, setData] = useState({
    brightness: 850,
    temperature: 32,
    voltage: 12.4,
    status: 'Active'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        brightness: Math.floor(700 + Math.random() * 400),
        temperature: Math.floor(28 + Math.random() * 10),
        voltage: (11.5 + Math.random() * 2).toFixed(1),
        status: Math.random() > 0.1 ? 'Active' : 'Standby'
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSync = () => {
    updateState({ synced: true })
    navigate('/processing')
  }

  const dataCards = [
    { label: 'Brightness', value: data.brightness, unit: 'lux', icon: Sun, color: 'yellow' },
    { label: 'Temperature', value: data.temperature, unit: '°C', icon: Thermometer, color: 'orange' },
    { label: 'Voltage', value: data.voltage, unit: 'V', icon: Zap, color: 'blue' },
    { label: 'Status', value: data.status, unit: '', icon: Activity, color: 'green' }
  ]

  const getColorClasses = (color) => {
    const colors = {
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: data.status === 'Active' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'
    }
    return colors[color]
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Live Data Stream</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Real-time sensor readings updating every second
          </p>
        </div>
        <button
          onClick={handleSync}
          className="btn-primary inline-flex items-center gap-2"
        >
          <UploadCloud className="w-5 h-5" />
          Sync to Cloud
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {dataCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl p-6 border-2 ${getColorClasses(card.color)} 
                       card-shadow transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon className="w-8 h-8" />
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
            </div>
            <p className="text-sm font-medium opacity-80 mb-1">{card.label}</p>
            <p className="text-3xl font-bold">
              {card.value}
              <span className="text-lg ml-1">{card.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Data Visualization</h3>
        <div className="h-64 bg-gray-50 rounded-xl flex items-end justify-around p-4 gap-2">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bg-blue-500 rounded-t-lg transition-all duration-500"
              style={{
                width: '4%',
                height: `${20 + Math.random() * 60}%`,
                opacity: 0.3 + (i / 20) * 0.7
              }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>-20s</span>
          <span>-15s</span>
          <span>-10s</span>
          <span>-5s</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  )
}

export default LiveData
