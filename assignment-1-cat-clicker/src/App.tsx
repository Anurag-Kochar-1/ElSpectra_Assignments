import './App.css';
import Layout from './layouts/Layout';
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./setup/routes-manager/index"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
