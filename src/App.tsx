import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserLogin } from './models';
import Home from './pages/home';
import Edicao from './pages/edicao';
import Login from './pages/login';
import Exporta from './pages/exporta';
import Listagem from './pages/listagem';
import Relatorio from './pages/relatorio';

function App() {
  const ProtectedRoute = ({
    user,
    children,
  }: {
    user: UserLogin;
    children: JSX.Element;
  }) => {
    if (user === null) {
      return <Navigate to="/login" replace />;
    }
    if (user.token) {
      return children;
    }
    return <Navigate to="/login" replace />;
  };
  let userString = localStorage.getItem('@user');
  //@ts-ignore
  let user = JSON.parse(userString);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute user={user}>
              <Navigate to="/home" replace />
            </ProtectedRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/home/:id"
          element={
            <ProtectedRoute user={user}>
              <Edicao />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/exporta"
          element={
            <ProtectedRoute user={user}>
              <Exporta />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/listagem"
          element={
            <ProtectedRoute user={user}>
              <Listagem />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/relatorio-customizado"
          element={
            <ProtectedRoute user={user}>
              <Relatorio />
            </ProtectedRoute>
          }
        ></Route>




        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
