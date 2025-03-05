"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result);
    if (result?.error) {
      // alert(result.error);
    } else {
      router.push("/dash");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <p>Inicia sesión para configurar tus datos</p>
      <div className="panel-form">
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="panel-input"
              />
            </label>
          </div>
          <div className="w-full">
            <label>
              Password
              <input
                className="panel-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </label>
          </div>
          <div className="w-full mt-3">
            <div className="flex justify-center">
              <button
                className="bg-blue-600 py-2 px-3 text-white rounded"
                type="submit"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
