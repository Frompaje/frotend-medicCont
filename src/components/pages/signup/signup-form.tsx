import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserSchema, CreateUserSchema } from "@/helpers/types/userSchema";
import { UserService } from "@/service/user";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputCreateUser } from "@/helpers/types/user";
import { Loader2 } from "lucide-react";

export const SignupForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: UserService.create,
    onSuccess: async () => {
      toast.success("Usuário criado com sucesso!");
      reset()
      setTimeout(() => navigate("/"),1000);
    },
    onError: async () => {
      toast.error("Credenciais inválidas");
    },
  });

  const {
    formState: { isValid },
    register,
    handleSubmit,
    reset
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const handleCreateUserForm = (data: InputCreateUser) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateUserForm)}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-4/5 lg:w-3/5 flex flex-col gap-2 ">
          <label htmlFor="name">Digite seu nome completo</label>
          <Input placeholder="Yan Edwards" {...register("name")} />
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          <label htmlFor="password">Digite sua senha</label>
          <Input
            type="password"
            placeholder="*********"
            {...register("password")}
          />
        </div>
        <Button className="w-4/5 lg:w-3/5" disabled={isPending || !isValid}>
          {isPending ? (
            <Loader2 className="ml-2 animate-spin" />
          ) : (
            "Registra-se"
          )}
        </Button>

        <div className="flex flex-col sm:flex-row  gap-1">
          <span>Quer tentar mais tarde?</span>
          <Link className="underline" to={"/"}>
            Voltar à página principal
          </Link>
        </div>
      </div>
    </form>
  );
};
