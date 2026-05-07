import { useNavigate } from 'react-router-dom'
import { Check, Zap, Building2, Package } from 'lucide-react'

function Plans({ updateState }) {
  const navigate = useNavigate()

  const plans = [
    {
      name: 'Basic',
      icon: Package,
      color: 'green',
      devices: 2,
      price: '₹499',
      features: ['2 Device Limit', 'Basic Analytics', 'Email Support', 'Daily Reports']
    },
    {
      name: 'Pro',
      icon: Zap,
      color: 'blue',
      devices: 5,
      price: '₹999',
      features: ['5 Device Limit', 'Advanced Analytics', 'Priority Support', 'Real-time Reports', 'AI Insights'],
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Building2,
      color: 'red',
      devices: 'Unlimited',
      price: 'Custom',
      features: ['Unlimited Devices', 'Enterprise Analytics', '24/7 Support', 'Custom Reports', 'AI Insights', 'API Access']
    }
  ]

  const handleSelectPlan = (planName) => {
    updateState({ plan: planName })
    navigate('/setup')
  }

  const getColorClasses = (color, popular) => {
    const base = {
      green: 'border-green-200 bg-green-50',
      blue: 'border-blue-200 bg-blue-50',
      red: 'border-red-200 bg-red-50'
    }
    const popularBorder = popular ? 'border-4 border-blue-500 scale-105' : 'border-2'
    return `${base[color]} ${popularBorder}`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
        <p className="text-xl text-gray-600">Select the perfect plan for your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 ${getColorClasses(plan.color, plan.popular)} 
                       card-shadow hover:shadow-2xl transition-all duration-300`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-center py-1 px-4 rounded-full text-sm font-semibold mb-4 inline-block">
                Most Popular
              </div>
            )}
            
            <div className={`p-4 rounded-xl bg-${plan.color}-100 w-fit mb-4`}>
              <plan.icon className={`w-8 h-8 text-${plan.color}-600`} />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold text-gray-800 mb-6">{plan.price}</div>
            <div className="text-lg text-gray-600 mb-6">{plan.devices} Devices</div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan(plan.name)}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
                ${plan.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans
