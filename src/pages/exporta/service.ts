import api from '../../service/api';

export type ClientePost = {
  cliente: string;
  tipoDeContrato: string;
  startDay: string;
  endtDay: string;
  qtdDeHorasCadastradas: string;
};

export const ClientesService = () => {
  api
    .get('clientes')
    .then((response) => console.log('response', response))
    .catch((error) => console.log('error', error));
};

export const ClientesServiceCreate = (values: ClientePost) => {
  api
    .post('clientes/create')
    .then((response) => console.log('response', response))
    .catch((error) => console.log('error', error));
};
