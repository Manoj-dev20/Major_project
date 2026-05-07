import { useState } from 'react'
import { Activity, ShieldAlert, Smartphone, Zap, Wifi, CreditCard, ChevronRight, Settings } from 'lucide-react'

function Dashboard({ state }) {
  const quickActions = [
    { icon: Wifi, label: 'Add Device', color: 'bg-blue-100 text-blue-600' },
    { icon: CreditCard, label: 'Pay Bill', color: 'bg-red-100 text-red-600' },
    { icon: Zap, label: 'Upgrade Plan', color: 'bg-purple-100 text-purple-600' },
    { icon: Settings, label: 'Settings', color: 'bg-gray-100 text-gray-600' }
  ]

  const activeServices = [
    { name: 'Smart Office Hub', status: 'Active', dataUsed: '45 GB', dataTotal: '100 GB' },
    { name: 'Warehouse Sensors', status: 'Active', dataUsed: '12 GB', dataTotal: '50 GB' },
    { name: 'Fleet Tracking', status: 'Warning', dataUsed: '48 GB', dataTotal: '50 GB' }
  ]

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">My Account</h2>
          <p className="text-gray-500 mt-1">Manage your enterprise services and connected devices</p>
        </div>
        <div className="bg-white rounded-full px-4 py-2 text-sm font-medium border border-gray-200 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          System Status: Optimal
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Main Balance / Plan Card (Like Airtel Thanks app) */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden lg:col-span-2">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Activity className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-red-100 font-medium mb-1">Current Billing Cycle</p>
            <div className="flex items-baseline gap-2 mb-6">
              <h3 className="text-5xl font-extrabold">₹4,250</h3>
              <span className="text-red-100">.00</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md">
                <p className="text-xs text-red-100 mb-1">Due Date</p>
                <p className="font-bold text-lg">15 Nov</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md">
                <p className="text-xs text-red-100 mb-1">Active Plan</p>
                <p className="font-bold text-lg">Enterprise Pro</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md">
                <p className="text-xs text-red-100 mb-1">Devices</p>
                <p className="font-bold text-lg">1,240</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md">
                <p className="text-xs text-red-100 mb-1">Total Data</p>
                <p className="font-bold text-lg">250 GB</p>
              </div>
            </div>
            
            <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-lg">
              Pay Bill Now
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-6 card-shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100 group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Services List */}
        <div className="bg-white rounded-3xl p-6 card-shadow border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Active Services</h3>
            <button className="text-red-600 text-sm font-semibold hover:underline flex items-center">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {activeServices.map((service, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{service.name}</h4>
                    <p className={`text-xs font-medium mt-0.5 ${service.status === 'Active' ? 'text-green-600' : 'text-amber-500'}`}>
                      ● {service.status}
                    </p>
                  </div>
                </div>
                <div className="text-right w-1/3">
                  <div className="flex justify-between text-xs mb-1 font-medium text-gray-600">
                    <span>{service.dataUsed}</span>
                    <span>{service.dataTotal}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${service.status === 'Active' ? 'bg-blue-500' : 'bg-red-500'}`} 
                      style={{ width: `${(parseInt(service.dataUsed) / parseInt(service.dataTotal)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-3xl p-6 card-shadow border border-gray-100">
           <div className="flex items-center gap-2 mb-6">
             <ShieldAlert className="w-5 h-5 text-red-500" />
             <h3 className="text-lg font-bold text-gray-900">System Alerts</h3>
           </div>
           
           <div className="space-y-4">
             <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
               <h4 className="text-amber-800 font-bold text-sm mb-1">High Data Usage</h4>
               <p className="text-amber-700 text-xs">Fleet Tracking service has consumed 96% of allocated data. Consider upgrading plan.</p>
               <button className="mt-3 text-xs font-bold text-amber-800 underline">Upgrade Plan</button>
             </div>
             <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
               <h4 className="text-gray-800 font-bold text-sm mb-1">Scheduled Maintenance</h4>
               <p className="text-gray-600 text-xs">API v2 endpoints will be down for 15 minutes on Sunday at 2 AM EST.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
