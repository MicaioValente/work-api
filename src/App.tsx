import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserLogin } from './models';
import Home from './pages/home';
import Login from './pages/login';
import Exporta from './pages/exporta';

function App() {
  const ProtectedRoute = ({
    user,
    children,
  }: {
    user: UserLogin;
    children: JSX.Element;
  }) => {
    console.log('!user', user);
    if (user.token) {
      return children;
    }
    return <Navigate to="/login" replace />;
  };
  let userString = localStorage.getItem('@user');
  //@ts-ignore
  let user = JSON.parse(userString)


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
