import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import axios from "axios";

const RegisterSchema = z
  .object({
    name: z.string().min(3, { message: "Nome Invalido." }),
    cpf: z.string({ message: "CPF Invalido." }),
    company: z.string().optional(),
    role: z.string().optional(),
    email: z.string().email({ message: "Email Invalido." }),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) =>
      data.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    {
      message:
        "A senha deve ter pelo menos 8 caracteres, conter uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      path: ["password"],
    },
  )
  .refine((data) => data.passwordConfirm === data.passwordConfirm, {
    message: "A senha e a confirmação de senha devem ser iguais.",
    path: ["password", "passwordConfirm"],
  });

export default function SignIn() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      cpf: "",
      company: "",
      role: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
    //   const response = await axios({
    //     method: "post",
    //     url: "http://localhost:3000/sign-up",
    //     data: {
    //       name: values.name,
    //       cpf: values.cpf,
    //       company: values.company ?? null,
    //       role: values.role ?? null,
    //       email: values.email,
    //       password: values.password,
    //     },
    //   });
    //   console.log(response.data);
  }

  return (
    <div className="w-screen h-screen bg-muted flex items-center justify-center">
      <Card className="w-10/12 md:max-w-lg">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Junte-se a nós e transforme a eficiência de suas reuniões.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nome Completo:</FormLabel>
                      <FormControl>
                        <Input placeholder="Fulano Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>CPF:</FormLabel>
                      <FormControl>
                        <Input placeholder="XXX.XXX.XXX-XX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Empresa:</FormLabel>
                      <FormControl>
                        <Input placeholder="Fulano Tech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Cargo:</FormLabel>
                      <FormControl>
                        <Input placeholder="Desenvolvedor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="exemplo@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
