import { ClientProvider } from './contexts/client/ClientContext';
import { Router } from './routes/Router';

function App() {
  return (
    <ClientProvider>
      <Router />
    </ClientProvider>
  );
}

export default App;
