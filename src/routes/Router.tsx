import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Client } from '../pages/client/Client';
import { ClientById } from '../pages/client/ClientById';
import { Home } from '../pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="clients" element={<Client />} />
        <Route path="clients/:id" element={<ClientById />} />
      </Route>
    </Routes>
  );
}
