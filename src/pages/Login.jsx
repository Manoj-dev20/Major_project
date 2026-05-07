import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cpu, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react'

function Login({ updateState }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    updateState({ loggedIn: true })
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-[90vh]">
      {/* Left side - Branding (Airtel/Jio style hero) */}
      <div className="hidden lg:flex w-1/2 bg-red-600 p-12 flex-col justify-between relative overflow-hidden rounded-3xl m-4 shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="bg-white p-2 rounded-lg">
              <Cpu className="w-8 h-8 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-white">SmartSense Enterprise</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Empowering your <br />connected world.
          </h1>
          <p className="text-red-100 text-lg max-w-md">
            Manage your IoT devices, monitor data, and scale your business with our enterprise-grade customer portal.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-4 text-red-100 bg-red-700/50 p-4 rounded-xl backdrop-blur-sm w-fit">
           <ShieldCheck className="w-6 h-6" />
           <span className="font-medium text-sm">Enterprise Grade Security & End-to-End Encryption</span>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500 rounded-full blur-[100px] -mr-40 -mt-40 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-800 rounded-full blur-[80px] -ml-20 -mb-20 opacity-50"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="bg-red-600 p-3 rounded-xl mb-4">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SmartSense AI</h1>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to your enterprise self-care portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12 bg-gray-50"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700 block">Password</label>
                <a href="#" className="text-sm text-red-600 hover:underline font-medium">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 bg-gray-50"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full group py-3.5 text-lg">
              Sign In
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account? <a href="#" className="text-red-600 font-semibold hover:underline">Contact Sales</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
