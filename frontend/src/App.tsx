import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import CommandCenter from './pages/CommandCenter'
import SatelliteDetection from './pages/SatelliteDetection'
import ValidationDrift from './pages/ValidationDrift'
import AISInvestigation from './pages/AISInvestigation'
import EmergencyResponse from './pages/EmergencyResponse'
import './index.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/command-center" replace />} />
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/satellite-detection" element={<SatelliteDetection />} />
            <Route path="/validation-drift" element={<ValidationDrift />} />
            <Route path="/ais-investigation" element={<AISInvestigation />} />
            <Route path="/emergency-response" element={<EmergencyResponse />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
