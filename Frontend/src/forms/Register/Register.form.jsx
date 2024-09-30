import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createUserAPI } from "../../app/api";
import { useGlobalState } from "../../app/global_store";

const RegisterForm = () => {
  const { setUserList } = useGlobalState((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await createUserAPI(data);
    if (response.code !== 1201) return toast.error("User creation failed");

    setUserList();
    toast.success("User created successfully");
  };

  return (
    <div className=" px-2 py-3 my-3 rounded-[16px]">
      <div className="text-xl font-bold  pl-10 ">Register a New User</div>
      <form className="pl-16 py-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 flex flex-wrap ">
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              maxLength: 80,

              pattern: {
                value: /^[a-zA-Z0-9]{3,25}$/,
                message: "Username must be 3-25 characters long and contain only letters and numbers",
              },
            })}
          />
          <input className="form-input" type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />

          <input
            className="form-input"
            type="text"
            placeholder="First name"
            {...register("firstName", { required: "First Name is required", maxLength: 80 })}
          />
          <input className="form-input" type="text" placeholder="Last name" {...register("lastName", { required: "Last Name is required", maxLength: 100 })} />
          <input
            className="form-input"
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
          />
        </div>
        <div className="errors">
          <ErrorMessage errors={errors} name="username" render={({ message }) => <p className="text-red-500">{message}</p>} />
          <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="text-red-500">{message}</p>} />
          <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="text-red-500">{message}</p>} />
          <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className="text-red-500">{message}</p>} />
          <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="text-red-500">{message}</p>} />
        </div>
        <div className="py-4 flex justify-start">
          <button className="form-button border border-solid border-[#4d869c] rounded-none hover:bg-[#eef7ff] " type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
