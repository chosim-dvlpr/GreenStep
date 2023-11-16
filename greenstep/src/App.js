import './App.css';
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import LandingPage from './Page/LandingPage';
import DownLoadPage from './Page/DownLoadPage';
import MapPage from './Page/MapPage';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/downloadpage" element={<DownLoadPage />} />
        <Route path="/mappage" element={<MapPage />} />
       
      </Routes>
    </div>
  </BrowserRouter>

  );
}

export default App;
