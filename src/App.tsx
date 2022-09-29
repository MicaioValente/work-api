import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserLogin } from './models';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  const ProtectedRoute = ({
    user,
    children,
  }: {
    user: UserLogin;
    children: JSX.Element;
  }) => {
    console.log('!user', user);
    if (user.name) {
      return children;
    }
    return <Navigate to="/login" replace />;
  };

  let userFake = {
    name: 'qqq',
    token: 'qqq',
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute user={userFake}>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
