import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Sun, BatteryCharging, MapPin, ChevronRight } from 'lucide-react'

function Devices({ updateState, state }) {
  const navigate = useNavigate()
  const [deviceName, setDeviceName] = useState('')
  const [deviceType, setDeviceType] = useState('Solar Tracker')
  const [location, setLocation] = useState('')
  const [devices, setDevices] = useState([
    { id: 1, name: 'Solar Tracker 1', type: 'Solar Tracker', location: 'Roof Top' },
    { id: 2, name: 'Solar Charger A', type: 'Solar Charger', location: 'Garage' }
  ])

  const handleAddDevice = () => {
    if (deviceName && location) {
      const newDevice = {
        id: devices.length + 1,
        name: deviceName,
        type: deviceType,
        location: location
      }
      setDevices([...devices, newDevice])
      setDeviceName('')
      setLocation('')
    }
  }

  const handleStartMonitoring = () => {
    updateState({ devices: devices })
    navigate('/live-data')
  }

  const getDeviceIcon = (type) => {
    return type === 'Solar Tracker' ? Sun : BatteryCharging
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Connected Devices</h2>
          <p className="text-gray-600">Manage your IoT devices</p>
        </div>
        <button
          onClick={handleStartMonitoring}
          className="btn-primary inline-flex items-center gap-2"
        >
          Start Monitoring
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-2xl card-shadow p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Device</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Device Name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="input-field"
          />
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="input-field"
          >
            <option>Solar Tracker</option>
            <option>Solar Charger</option>
            <option>Smart Sensor</option>
            <option>Energy Monitor</option>
          </select>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <button
            onClick={handleAddDevice}
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 
                       transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {devices.map((device) => {
          const Icon = getDeviceIcon(device.type)
          return (
            <div
              key={device.id}
              className="bg-white rounded-2xl card-shadow p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-4 rounded-xl">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{device.name}</h4>
                    <p className="text-gray-600">{device.type}</p>
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{device.location}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Devices
