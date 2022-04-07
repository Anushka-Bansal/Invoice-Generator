import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Registration from './Components/Registration';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Invoice from './Components/Invoice';
import GeneratePDF from './Components/GeneratePDF';
import Invoicehistory from './Components/Invoicehistory';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login /> } />
          <Route path="/register" element={<Registration /> } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<Invoicehistory />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/generate" element={<GeneratePDF />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
