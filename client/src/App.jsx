import {BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Home from "./pages/Home" 
import About from "./pages/About" 
import Profile from "./pages/Profile" 
import SignIn from "./pages/SignIn" 
import SignUp from "./pages/SignUp" 
import Header from "./components/Header"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateEstate from "./pages/CreateEstate"

function App() {
  return (
    <>
      <Router>

        <Header/>

        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn/>}/> 
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/about" element={<About/>}/>
            
          <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>}/>

          <Route path="/create-estate" element={<ProtectedRoute> <CreateEstate/> </ProtectedRoute>}/>

        </Routes>

      </Router>
    </>
  ) 
}

export default App
