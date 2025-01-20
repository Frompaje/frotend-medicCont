import { SignupForm } from "@/components/pages/signup/signup-form";

export const Signup = () => {
  return (
    <main className="font-semibold  grid  h-screen lg:grid-cols-2">
      <div className="bg-black rounded-r-lg hidden lg:block"></div>

      <div className="grid lg:grid-cols-subgrid p-2">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-extrabold">
            Vamos começar com o seu cadastro!
          </h1>
          <p>
            Uma solução completa para gestão de taxas. Pague suas taxas de forma
            prática, acompanhe o histórico anual e acesse uma listagem
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
};
