"use client";
import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import lottieJson from "../../../../public/animation_lkjfxofn.json";
import Image from "next/image";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Login(props) {
  const [Name, setName] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const LoginAuth = () => {
    setLoading(true);
    const url = `https://parseapi.back4app.com/login?username=${Name}&password=${password}`;

    const config = {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_REST_KEY,
      },
    };

    axios.get(url, config).then((res) => {
      console.log(res);
      // props.setIsAuthenticated(true);
      //   setLoading(false);
      localStorage.setItem("userData", JSON.stringify(res.data));
      router.push("/Pages/AddBlog");
    });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-10 w-auto"
              src={require("../../../Assets/imo-state-logo.png")}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Username"
                    //   autoComplete="email"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
                </div>
                <div className="mt-2">
                  <div class="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter password"
                    />

                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        onClick={handleTogglePassword}
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  // type="submit"
                  onClick={LoginAuth}
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
                  Sign in
                </button>
                {loading ? (
                  <div className="flex justify-center">
                    <Lottie
                      loop
                      animationData={lottieJson}
                      play
                      style={{ width: "50%", height: "50%" }}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
