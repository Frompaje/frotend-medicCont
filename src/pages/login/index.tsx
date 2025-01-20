import { LoginForm } from "@/components/pages/login/login-form";

export const Login = () => {
  
  return (
    <main className="font-semibold  grid  h-screen lg:grid-cols-2">
      <div className="bg-black rounded-r-lg hidden lg:block"></div>

      <div className="grid lg:grid-cols-subgrid p-2">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-extrabold">Bem-vindo de volta</h1>
          <p>Continue de onde parou e gerencie suas taxas com facilidade.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
};
