import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { Button } from "../components/Button";
import { useState } from "react";
import { SigninType } from "@surabhilssk/project-mache";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signinData, setSigninData] = useState<SigninType>({
    email: "",
    password: "",
  });

  async function signinUser() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinData
      );
      const jwt = response.data.jwt;
      if (jwt) {
        localStorage.setItem("token", jwt);
        navigate("/tasks");
      } else {
        throw new Error("JWT token is missing");
      }
      setLoading(false);
    } catch (e) {
      toast.error("Error while signing in!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center flex-col h-screen">
      <div className="flex justify-center">
        <div className="border rounded-lg p-5">
          <div>
            <div className="mb-2 text-3xl font-extrabold text-center">
              Sign in
            </div>
            <div className="text-center mb-5 text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-slate-500 font-semibold underline"
              >
                Signup
              </Link>
            </div>
            <div>
              <AuthForm
                label="Email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setSigninData({
                    ...signinData,
                    email: e.target.value.toLowerCase(),
                  });
                }}
              />
              <AuthForm
                onChange={(e) => {
                  setSigninData({ ...signinData, password: e.target.value });
                }}
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center mb-3">
              <Button
                text={loading === false ? "Sign in" : "Loading..."}
                onClick={signinUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
