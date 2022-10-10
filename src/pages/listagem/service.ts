import api from '../../service/api';

export type Cliente = {
  cliente: string;
  endDay: any;
  project: string;
  startDay: any;
  timer: string;
  tool: string;
};

export interface MovieClients {
  nome: string;
  clienteId: string;
  _Id: string;
}

export interface ClockClients {
  nome: string;
  clienteId: string;
  _Id: string;
}

export const getNormalClientes = () => {
  return api.get(`clients`);
};

export const deleteClientById = (clientId: string) => {
  return api.delete(`clients/${clientId}`);
};

export const getMovieDeskClientes = () => {
  return api.get<MovieClients>(`clients/all-integration-moviedesk`);
};

export const getClockiFyClientes = () => {
  return api.get<ClockClients>(`clients/all-integration-clockfy`);
};
// https://report.workdb.com.br/api/Reports/clockfy/excel/porProjeto?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-09-01T18%3A11%3A00.802Z&dataFinal=2022-09-30T18%3A11%3A05.271Z&projectId=6zAcroMBPkw3Lv1Q2aFe
// https://report.workdb.com.br/api/Reports/clockfy/excel/porProjeto?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-09-01T18:11:00.802Z&dataFinal=2022-09-30T18:11:05.271Z&projectId=6zAcroMBPkw3Lv1Q2aFe
