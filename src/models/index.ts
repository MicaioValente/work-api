export type UserLogin = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export type Projects = {
  clientNameLowerCase: string;
  clientName: string;
  projetoId: string;
  projectName: string;
  clienteId: string;
  _Id: string;
};
