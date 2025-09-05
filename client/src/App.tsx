import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup";
import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AuthLayout>
              <Login/>
            </AuthLayout>
          }/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/signup" element={<AuthLayout>
              <Signup/>
            </AuthLayout>} />
            <Route path="/" element={<AuthLayout>
              <Login/>
            </AuthLayout>}/>
        </Routes>
    </div>
  )
}

export default App
