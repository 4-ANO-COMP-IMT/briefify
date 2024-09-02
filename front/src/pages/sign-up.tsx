import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, PersonStanding } from "lucide-react";
import { CardButton } from "@/components/ui/card-button";
import { ReactNode, useEffect, useState } from "react";
import RegisterForm from "@/components/register-form";

export default function SignIn() {
  const [accountType, setAccountType] = useState<
    "personal" | "cooperative" | undefined
  >();
  const [cardContent, setCardContent] = useState<ReactNode>(
    <AccountTypeCardContent accountType={setAccountType} />,
  );

  useEffect(() => {
    if (accountType) {
      setCardContent(<RegisterForm accountType={accountType} />);
    }
  }, [accountType]);

  return (
    <div
      className={`w-screen ${accountType === "cooperative" ? "h-full py-32 md:h-screen md:p-0" : "h-screen"} bg-muted flex items-center justify-center`}
    >
      <Card className="w-10/12 md:w-fit">{cardContent}</Card>
    </div>
  );
}

interface AccountTypeCardContent {
  accountType: (type: "personal" | "cooperative") => void;
}

const AccountTypeCardContent = ({ accountType }: AccountTypeCardContent) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Qual é o tipo da conta?</CardTitle>
        <CardDescription>Selecione o propósito da sua conta.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-3">
        <CardButton
          onClick={() => accountType("personal")}
          icon={PersonStanding}
          title={"Pessoal"}
          description={
            "Conta para uso pessoal, ideal para suas atividades pessoais e hobbies."
          }
          bottomText="Próxima Etapa"
        />
        <CardButton
          onClick={() => accountType("cooperative")}
          icon={Building2}
          title={"Corporativa"}
          description={
            "Conta para empresas, perfeita para administrar atividades profissionais e empresariais."
          }
          bottomText="Próxima Etapa"
        />
      </CardContent>
    </>
  );
};
