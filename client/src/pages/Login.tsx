import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import Button from "../components/button/button";
import { axios } from "../utils/axios.config";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    try {
      setLoading(true);

      event.preventDefault();
      if (!email || !password) {
        throw new Error("Please fill in all fields.");
      }

      const response = await axios.post("/auth/login", { email, password });
      if (response.status !== 200) {
        console.log(response)
        setError(response.data.message);
      }
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("name", response.data.data.student.lastName);
      navigate("/dashboard");

    } catch (error: any) {
      if (error.name == "AxiosError") {
        setError(error.response.data.message || "Something went wrong");
      }
      else
        setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="msm:hidden md:flex md:w-1/2 bg-slate-200 h-screen  gap-4 flex-col flex items-center justify-center">
        <h1 className="text-4xl  font-black text-transparent bg-gradient-to-tr from-sky-900 to-sky-700 bg-clip-text">
          RCA LMIS
        </h1>
        <h1>RCA Library Management System</h1>
      </div>
      <div className="md:w-1/2  msm:w-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg  border border-slate-100 msm:w-full  md:w-[400px]">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-center">Login to continue!</h1>
            <p className="text-sm text-gray-600 mb-8 text-center">
              Enter your credentials to login
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              _controller={{
                value: email,
                setValue: setEmail,
                initialValue: "",
              }}
              label="Email"
              type="text"
              placeholder="Email address"
            />
            <Input
              _controller={{
                value: password,
                setValue: setPassword,
                initialValue: "",
              }}
              label="Password"
              type="password"
              placeholder="Enter password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="w-full">{loading ? "Loading..." : "Login"}</Button>

            <div className="flex flex-col items-center justify-center">
              <span className="p-2 w-fit relative z-20 opacity-40 bg-white">OR</span>
              <div className="border-b w-full relative z-10 border-slate-100 -mt-[18px]" />
            </div>
            <div className="mt-4">
              <Link
                to="/signup"
                className="text-sky-500  hover:text-sky-700"
              >
                <p className="text-sm  no-underline h-[50px] flex items-center text-center justify-center rounded-full text-sky-700 w-full font-normal border border-slate-200 bg-white">
                  Create account
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
