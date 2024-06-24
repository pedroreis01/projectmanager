import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppProvider from './AppProvider';
import Navigation from './routes';
import { Layout } from './layout';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Navigation />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
