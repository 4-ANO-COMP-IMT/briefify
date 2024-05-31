import { randomUUID } from "crypto";
import { IRepository, User } from "./repository-interface";

export class UserRepositoryMock implements IRepository {
  private users: User[] = [];

  constructor() {
    this.users = [
      {
        id: randomUUID(),
        name: "John Doe",
        cpf: 12345678901,
        email: "john.doe@example.com",
        password: "password123",
        company: "Company A",
      },
      {
        id: randomUUID(),
        name: "Jane Smith",
        cpf: 10987654321,
        email: "jane.smith@example.com",
        password: "password456",
        company: "Company B",
      },
    ];
  }

  getUser(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  signInUser(email: string, password: string): User | undefined {
    return this.users.find(
      (user) => user.email === email && user.password === password,
    );
  }

  createUser(
    name: string,
    email: string,
    cpf: number,
    password: string,
    company: string,
  ): User {
    const newUser: User = {
      id: randomUUID(),
      name,
      email,
      cpf,
      password,
      company,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(
    id: string,
    name?: string,
    email?: string,
    cpf?: number,
    password?: string,
    company?: string,
  ): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const currentUser = this.users[userIndex];
      const updatedUser = {
        ...currentUser,
        name: name ?? currentUser.name,
        email: email ?? currentUser.email,
        cpf: cpf ?? currentUser.cpf,
        password: password ?? currentUser.password,
        company: company ?? currentUser.company,
      };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    return undefined;
  }

  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
