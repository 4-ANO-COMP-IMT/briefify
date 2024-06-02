import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="h-screen relative">
      <Navbar />
      <LampContainer className="pt-96 h-screen">
        <div className="flex flex-col items-center h-full pt-48">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-stone-700 to-black py-10 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Nós Transformamos Conversas <br /> em Memória Eficiente
          </motion.h1>
          <motion.p
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="md:w-1/2 text-center text-xl text-muted-foreground"
          >
            Simplifique suas reuniões com a clareza e a praticidade da Briefify.
            Diga adeus ao caos e dê boas-vindas a atas automáticas, detalhadas e
            precisas, tudo ao alcance de um clique.
          </motion.p>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-1/2 pt-10 flex flex-row justify-around"
          >
            <Button variant={"ghost"} size={"lg"}>
              Criar Reunião
            </Button>
            <Button>Entrar em Reunião</Button>
          </motion.div>
        </div>
      </LampContainer>
    </div>
  );
}

export default Home;
