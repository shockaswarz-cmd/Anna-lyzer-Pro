import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DealProvider } from './context/DealContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewDeal from './pages/NewDeal';
import Analysis from './pages/Analysis';
import PackView from './pages/PackView';
import './index.css';

function App() {
  return (
    <DealProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="new-deal" element={<NewDeal />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="pack" element={<PackView />} />
            <Route path="packs" element={<div><h1>Saved Packs</h1></div>} />
            <Route path="settings" element={<div><h1>Settings</h1></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DealProvider>
  );
}

export default App;
