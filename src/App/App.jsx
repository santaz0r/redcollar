import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Homepage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<h1>Page not Found</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
