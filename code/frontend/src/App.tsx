import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppProvider from './AppProvider';
import Navigation from './routes';
import { Layout } from './layout';

function App() {
  return (
    <AppProvider>
      <Layout>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </Layout>
    </AppProvider>
  );
}

export default App;
