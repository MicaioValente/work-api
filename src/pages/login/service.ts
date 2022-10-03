import { toast } from 'react-toastify';
import api from '../../service/api';

const LoginService = (values: { email: string; password: string }, navigate: any) => {
  api
    .post('auth', values)
    .then((response) => {
      console.log(444, response)
       if(response?.status ===  200){
        console.log(3)
        localStorage.setItem('@user', JSON.stringify(response.data));
        navigate('/');
      }else{
        toast.error('Digite email ou senha');
      }
    })
    .catch((error) => console.log('error', error));
};

export default LoginService;
