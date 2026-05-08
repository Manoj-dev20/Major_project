import { useState, useEffect } from 'react'
import { X, ShieldCheck, CreditCard, Smartphone, Landmark, Wallet, CheckCircle2, Loader2, ChevronRight, QrCode } from 'lucide-react'

function PaymentModal({ isOpen, onClose, amount, onSuccess }) {
  const [step, setStep] = useState('methods') // methods, upi, card, processing, success
  const [selectedMethod, setSelectedMethod] = useState(null)
  
  if (!isOpen) return null

  const handlePay = () => {
    setStep('processing')
    setTimeout(() => {
      setStep('success')
    }, 2000)
  }

  const methods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Netbanking', icon: Landmark, desc: 'All Indian Banks' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, desc: 'Mobikwik, Freecharge' },
  ]

  const upiOptions = [
    { name: 'Google Pay', icon: 'https://cdn.iconscout.com/icon/free/png-256/google-pay-2038779-1721670.png' },
    { name: 'PhonePe', icon: 'https://cdn.iconscout.com/icon/free/png-256/phonepe-2038777-1721668.png' },
    { name: 'Paytm', icon: 'https://cdn.iconscout.com/icon/free/png-256/paytm-226448.png' }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-[#f8f9ff] w-full max-w-[420px] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
        
        {/* Razorpay-style Header */}
        <div className="bg-[#1c2c54] p-5 text-white flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
              <div className="bg-red-600 p-1.5 rounded-md">
                <span className="text-white font-bold text-lg">SE</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">SmartSense Enterprise</h3>
              <p className="text-white/60 text-xs mt-0.5">Order #ORD-77421</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="bg-[#2d3a61] px-5 py-3 flex justify-between items-center border-t border-white/10">
          <p className="text-white/80 text-sm">Amount Payable</p>
          <p className="text-white font-bold text-xl">₹{amount}</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-5 min-h-[360px] flex flex-col">
          
          {step === 'methods' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Preferred Payment Methods</p>
              <div className="space-y-3">
                {methods.map((m) => (
                  <button 
                    key={m.id}
                    onClick={() => {
                      setSelectedMethod(m.id)
                      setStep(m.id === 'upi' ? 'upi' : 'card')
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:bg-white transition-colors">
                        <m.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'upi' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button 
                onClick={() => setStep('methods')}
                className="text-blue-600 text-xs font-bold mb-4 flex items-center gap-1 hover:underline"
              >
                ← Back to payment methods
              </button>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Select UPI App</p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {upiOptions.map((app) => (
                  <button key={app.name} onClick={handlePay} className="flex flex-col items-center p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                    <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain mb-2" />
                    <span className="text-[10px] font-bold text-gray-700">{app.name}</span>
                  </button>
                ))}
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">OR</span></div>
              </div>

              <button onClick={handlePay} className="w-full flex items-center gap-3 p-4 rounded-xl border border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50 transition-all group">
                <QrCode className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-bold text-blue-600">Scan QR Code</span>
              </button>
            </div>
          )}

          {step === 'card' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button 
                onClick={() => setStep('methods')}
                className="text-blue-600 text-xs font-bold mb-4 flex items-center gap-1 hover:underline"
              >
                ← Back
              </button>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Enter Card Details</p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="XXXX XXXX XXXX XXXX" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-6 h-4 bg-gray-100 rounded text-[6px] flex items-center justify-center font-bold">VISA</div>
                      <div className="w-6 h-4 bg-gray-100 rounded text-[6px] flex items-center justify-center font-bold">MC</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Expiry</label>
                    <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">CVV</label>
                    <input type="password" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                </div>

                <button 
                  onClick={handlePay}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all mt-4 flex items-center justify-center gap-2"
                >
                  Pay ₹{amount}
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-10 animate-in zoom-in-95 duration-500">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">Processing Payment</h4>
                <p className="text-sm text-gray-500 mt-2 max-w-[240px] mx-auto">Please do not refresh or close the page while we confirm your transaction</p>
              </div>
              <div className="bg-gray-50 px-4 py-2 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Secure Payment Powered by Razorpay
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-10 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce-slight">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-bold text-2xl text-gray-900">Payment Successful!</h4>
                <p className="text-sm text-gray-500 mt-2">Your payment of ₹{amount} has been received.</p>
                <div className="mt-4 p-3 bg-gray-50 rounded-xl inline-block">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Transaction ID</p>
                  <p className="text-xs font-mono text-gray-700">pay_O7p0l9M3Kz8J2X</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  onSuccess()
                  onClose()
                }}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all"
              >
                Continue to Dashboard
              </button>
            </div>
          )}

        </div>

        {/* Footer info */}
        {step !== 'success' && step !== 'processing' && (
          <div className="p-4 bg-gray-50 flex items-center justify-center gap-2 border-t border-gray-100">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <p className="text-[10px] font-medium text-gray-500">100% Secure Payments | Razorpay Certified</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
