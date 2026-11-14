import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './Pages/Home'
import Upload from './Pages/Upload'
import Dashboard from './Pages/Dashboard'
import History from './Pages/History'
import './App.css'
import ReviewMeal from './Pages/ReviewMeal'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/review" element={<ReviewMeal />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
