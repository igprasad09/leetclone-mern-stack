import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup";
import AuthLayout from "./components/AuthLayout";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="w-full h-full">
      <Toaster position="top-right" richColors/>

        <Routes>
            <Route path="/login" element={<AuthLayout>
              <Login/>
            </AuthLayout>
          }/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/signup" element={<AuthLayout>
              <Signup/>
            </AuthLayout>} />
            <Route path="/" element={<Navigate to={"/dashboard"}/>}/>
        </Routes>
    </div>
  )
}

export default App
