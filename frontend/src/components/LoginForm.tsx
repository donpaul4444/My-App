
import { useForm } from "react-hook-form";
type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-2 flex  flex-col w-80 p-5 gap-5 justify-center items-center"
    ><p>Test2</p>
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="border-2"
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="border-2"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
