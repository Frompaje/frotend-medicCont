export type InputCreateUser = {
  name: string;
  password: string;
  email: string;
};

export type InputLoginUser = {
  password: string;
  email: string;
};

export type JwtPayload = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};
