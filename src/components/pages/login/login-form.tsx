import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/service/user";
import { toast } from "sonner";
import { InputLoginUser } from "@/helpers/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/helpers/types/userSchema";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/providers/auth-context";

export const LoginForm = () => {
  const { handleLogin } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: UserService.login,
    onSuccess: async (data) => {
      toast.success("Logado com sucesso!");
      await handleLogin(data.accessToken);
    },
    onError: async () => {
      toast.error("Credenciais inválidas");
    },
  });

  const {
    formState: { isValid },
    register,
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginForm = (data: InputLoginUser) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleLoginForm)}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-4/5 lg:w-3/5 flex flex-col gap-2 ">
          <label htmlFor="email">Email</label>
          <Input placeholder="example@email.com" {...register("email")} />
          <label htmlFor="password">Digite sua senha</label>
          <Input
            type="password"
            placeholder="*********"
            {...register("password")}
          />

        </div>
        <Button className="w-4/5 lg:w-3/5" disabled={isPending || !isValid}>
          {isPending ? <Loader2 className="ml-2 animate-spin" /> : "Login"}
        </Button>

        <div className="flex flex-col sm:flex-row  gap-1">
          <span>Ainda não tem conta?</span>
          <Link className="underline" to={"/signup"}>
            Cadastre-se agora
          </Link>
        </div>
      </div>
    </form>
  );
};
