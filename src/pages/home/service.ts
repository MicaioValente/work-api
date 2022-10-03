import api from '../../service/api';

export type ClientePost = {
  nome: string;
  tipoContrato: string;
  inicioContrato: any;
  finalContrato: any;
  quantidadeHoras: string;
};

// {
//   "nome": "string",
//   "tipoContrato": "string",
//   "inicioContrato": "2022-10-03T07:11:18.623Z",
//   "finalContrato": "2022-10-03T07:11:18.624Z",
//   "quantidadeHoras": "string"
// }

export const ClientesService = (timerTool: string) => {
  return api
    .get(`Clients/all-integration-${timerTool}`)

};

export const ClientesServiceCreate = (values: ClientePost) => {
  return api
    .post('Clients', values)

};
