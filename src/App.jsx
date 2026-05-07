import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Plans from './pages/Plans'
import Setup from './pages/Setup'
import Devices from './pages/Devices'
import LiveData from './pages/LiveData'
import Processing from './pages/Processing'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'

export const appState = {
  plan: null,
  devices: [],
  synced: false,
  processed: false
}

function App() {
  const [state, setState] = useState(appState)

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Login updateState={updateState} />} />
          <Route path="/login" element={<Login updateState={updateState} />} />
          <Route path="/plans" element={<Plans updateState={updateState} state={state} />} />
          <Route path="/setup" element={<Setup updateState={updateState} state={state} />} />
          <Route path="/devices" element={<Devices updateState={updateState} state={state} />} />
          <Route path="/live-data" element={<LiveData updateState={updateState} state={state} />} />
          <Route path="/processing" element={<Processing updateState={updateState} state={state} />} />
          <Route path="/dashboard" element={<Dashboard updateState={updateState} state={state} />} />
          <Route path="/insights" element={<Insights updateState={updateState} state={state} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
