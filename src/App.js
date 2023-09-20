
import { Route, Routes } from "react-router-dom"
import Login from './pages/LoginPage';
import SignUp from './pages/SignUp';
import ImageGallery from "./pages/ImageGallery";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/image" element={<ImageGallery/>}/>
       
      </Routes>
     
    </div>
  );
}

export default App;
