import api from '../../service/api';

export type ClientePut = {
  id: string;
  clientId: string;
  nome: string;
  tipoContrato: string;
  dataRenovacao: string;
  inicioContrato: string;
  finalContrato: string;
  quantidadeHoras: string;
};

export const ClientesService = (timerTool: string) => {
  return api.get(`Clients/all-integration-${timerTool}`);
};

export const putCliente = (values: any) => {
  console.log('values', values);
  return api.put(`clients`, values);
};
