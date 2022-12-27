import api from '../../service/api';

export type ClientePost = {
  cliente: string;
  endDay: any;
  project: string;
  startDay: any;
  timer: string;
  tool: string;
};

export const clientsService = (timerTool: string) => {
  return api.get(`Clients/all-integration-${timerTool}`);
};

export const clientsServiceCreate = (
  values: ClientePost,
  timerToolDoc: string,
  tool: string
) => {
  return api.post(
    `Reports/${timerToolDoc}/${tool}?cliente=${values.cliente}&dataInicio=${values.startDay}&dataFinal=${values.endDay}`,
    {
      responseType: 'blob',
    }
  );
};

export const ProjectsClinteService = (clientSelected: string) => {
  return api.get(`projects/porCliente?clienteId=${clientSelected}`);
};

export const dowloadWithProjectService = (
  tool: string,
  clienteId: string,
  dataInicio: string,
  dataFinal: string,
  projetoId: string
) => {
  return api.post(
    `Reports/clockfy/${tool}/porProjeto?cliente=${clienteId}&dataInicio=${dataInicio}&dataFinal=${dataFinal}&projectId=${projetoId}`
  );
};
// https://report.workdb.com.br/api/Reports/clockfy/excel/porProjeto?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-09-01T18%3A11%3A00.802Z&dataFinal=2022-09-30T18%3A11%3A05.271Z&projectId=6zAcroMBPkw3Lv1Q2aFe
// https://report.workdb.com.br/api/Reports/clockfy/excel/porProjeto?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-09-01T18:11:00.802Z&dataFinal=2022-09-30T18:11:05.271Z&projectId=6zAcroMBPkw3Lv1Q2aFe
