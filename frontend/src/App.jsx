import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DrivePage from "./pages/DrivePage";

function App(){
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/drive" element={<DrivePage/>}/>
    
    </Routes>

  );
}

export default App;