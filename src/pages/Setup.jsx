import { useNavigate } from 'react-router-dom'
import { Monitor, Wifi, Shield, ArrowRight } from 'lucide-react'

function Setup({ state }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-2xl card-shadow p-12 w-full max-w-2xl text-center">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl inline-block mb-6">
            <Monitor className="w-20 h-20 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Edge Device (Black Box) is Ready
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Your SmartSense AI edge computing device has been configured and is ready to connect.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 p-4 rounded-xl">
            <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">Connected</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">Secured</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <Monitor className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">Active</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <p className="text-gray-600 mb-2">Selected Plan</p>
          <p className="text-2xl font-bold text-blue-600">{state.plan || 'Pro'}</p>
        </div>

        <button
          onClick={() => navigate('/devices')}
          className="btn-primary inline-flex items-center gap-3 text-lg"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Setup
