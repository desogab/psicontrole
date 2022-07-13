import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { HomeLayout } from '../layout/HomeLayout';
import { Client } from '../pages/client/Client';
import { ClientById } from '../pages/client/ClientById';
import { ClientCreate } from '../pages/client/ClientCreate';
import { Home } from '../pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />

        <Route path="/clients" element={<AuthLayout />}>
          <Route index element={<Client />} />
          <Route path="/clients/:id" element={<ClientById />} />
          <Route path="/clients/create" element={<ClientCreate />} />
        </Route>
      </Route>
    </Routes>
  );
}
