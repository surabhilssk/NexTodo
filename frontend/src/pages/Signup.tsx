import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { Button } from "../components/Button";
import { SignupType } from "@surabhilssk/project-mache";
import { useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const Signup = () => {
  const navigate = useNavigate();
  const [sighupData, setSignupData] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function signupUser() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        sighupData
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
      toast.error("Error while signing up!", {
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
              Create an account
            </div>
            <div className="text-center mb-5 text-slate-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-slate-500 font-semibold underline"
              >
                Login
              </Link>
            </div>
            <div>
              <AuthForm
                label="Full Name"
                placeholder="Enter your full name"
                onChange={(e) => {
                  setSignupData({ ...sighupData, name: e.target.value });
                }}
              />
              <AuthForm
                label="Email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setSignupData({
                    ...sighupData,
                    email: e.target.value.toLowerCase(),
                  });
                }}
              />
              <AuthForm
                label="Password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setSignupData({ ...sighupData, password: e.target.value });
                }}
              />
            </div>
            <div className="text-center mb-3">
              <Button
                text={loading === false ? "Sign Up" : "Loading..."}
                onClick={signupUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
