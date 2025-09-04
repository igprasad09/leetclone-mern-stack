import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/" element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default App
