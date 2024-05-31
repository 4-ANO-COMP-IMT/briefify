export interface User {
  id: string;
  name: string;
  cpf: number;
  email: string;
  password: string;
  company: string;
}

export interface IRepository {
  getUser(id: string): User | undefined;
  getAllUsers(): User[];
  signInUser(email: string, password: string): User | undefined;
  createUser(
    name: string,
    email: string,
    cpf: number,
    password: string,
    company: string,
  ): User;
  updateUser(
    id: string,
    name?: string,
    email?: string,
    cpf?: number,
    password?: string,
    company?: string,
  ): User | undefined;
  deleteUser(id: string): boolean;
}
