import api from '../../service/api';

const LoginService = (values: { email: string; password: string }) => {
  api
    .post('auth', values)
    .then((response) => console.log('response', response))
    .catch((error) => console.log('error', error));
};

export default LoginService;
