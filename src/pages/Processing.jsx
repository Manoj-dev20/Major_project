import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Brain, Lightbulb, Loader2, CheckCircle } from 'lucide-react'

function Processing({ updateState }) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { icon: Upload, text: 'Uploading Data', color: 'blue' },
    { icon: Brain, text: 'Analyzing Patterns', color: 'purple' },
    { icon: Lightbulb, text: 'Generating Insights', color: 'yellow' }
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + 1
      })
    }, 35)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          clearInterval(progressInterval)
          setTimeout(() => {
            updateState({ processed: true })
            navigate('/insights')
          }, 500)
          return prev
        }
        return prev + 1
      })
    }, 1200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-2xl card-shadow p-12 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">AI Processing</h2>

        <div className="mb-8">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 
                         transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-lg font-semibold text-gray-700">{progress}% Complete</p>
        </div>

        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500
                ${index === currentStep ? 'bg-blue-50 scale-105' : ''}
                ${index < currentStep ? 'bg-green-50' : 'bg-gray-50'}
              `}
            >
              <div className={`p-3 rounded-lg
                ${index === currentStep ? `bg-${step.color}-100 animate-pulse` : ''}
                ${index < currentStep ? 'bg-green-100' : 'bg-gray-200'}
              `}>
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : index === currentStep ? (
                  <Loader2 className={`w-6 h-6 text-${step.color}-600 animate-spin`} />
                ) : (
                  <step.icon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <span className={`text-lg font-medium
                ${index === currentStep ? 'text-gray-800' : ''}
                ${index < currentStep ? 'text-green-700' : 'text-gray-400'}
              `}>
                {step.text}
              </span>
              {index === currentStep && (
                <div className="ml-auto">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-gray-500">
          Our AI is analyzing your data to generate personalized insights...
        </p>
      </div>
    </div>
  )
}

export default Processing
