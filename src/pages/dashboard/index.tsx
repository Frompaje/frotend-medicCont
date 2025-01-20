import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Dashboard = () => {
  return (
    <main className="h-screen text-white ">
      <header className="h-20 bg-black rounded-b-xl flex justify-center items-center ">
        <h1 className="font-semibold text-2xl">
          Simulador de Alíquota Efetiva
        </h1>
      </header>
      <div className="flex flex-col items-center">
        <div className="bg-black rounded-xl mt-14 p-3 text-black max-w-md">
          <div className="flex gap-4 justify-center p-4">
            <Button variant={"secondary"}>Calculo Anual</Button>
            <Button variant={"secondary"}>
              Listagem dos impostos de renda por ano
            </Button>
          </div>

          <div className="bg-white h-5/6 rounded-xl p-4">
            <div className=" flex flex-col  gap-4">
              <div className="bg-gray-200 rounded-xl p-1">
                <label htmlFor="rendimentos-tributais" className="font-bold">
                  Rendimentos Tributáveis
                </label>
                <Input />
              </div>

              <div className="bg-gray-200 rounded-xl p-1">
                <h1 className="font-semibold text-xl">Deduçõe</h1>
                <div>
                  <label htmlFor="previdencia-oficial" className="font-bold">
                    Previdência Oficial
                  </label>
                  <Input type="number" />
                </div>
                <div>
                  <label htmlFor="previdencia-oficial" className="font-bold">
                    Dependente (quantidade)
                  </label>
                  <Input type="number" />
                  <p>
                    O valor da dedução é{" "}
                    <span className="font-bold">R$ 189,59</span> mensais, por
                    dependente.
                  </p>
                </div>
              </div>

              <div className="bg-gray-200 rounded-xl p-1">
                <h1>Base de cálculo (1 - 2)</h1>
                <span>3.920,80</span>
                <h1>Imposto</h1>
                <span>219,41</span>
              </div>
            </div>
            <div >
              <Button className="w-full mt-4">Pagar</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
