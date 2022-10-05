import { toast } from 'react-toastify';
import api from '../../service/api';

const LoginService = (values: { email: string; password: string }) => {
  return api.post('auth', values);
};

export default LoginService;
