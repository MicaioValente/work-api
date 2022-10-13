import api from '../../service/api';

export type ClientePost = {
  nome: string;
  tipoContrato: string;
  inicioContrato: any;
  finalContrato: any;
  quantidadeHoras: string;
  dataRenovacao: any;
};

export const ClientesService = (timerTool: string) => {
  return api.get(`Clients/all-integration-${timerTool}`);
};

export const ClientesServiceCreate = (values: ClientePost) => {
  return api.post('Clients', values);
};
