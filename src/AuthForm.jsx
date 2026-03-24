import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import api from "./api";
function AuthForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await api.post("auth/login", data);
      setError("");
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/todo");
    } catch (error) {
      setError(
        error.response.data.message || error.response.data.errors[0].msg
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main">
      <h1>Авторизация</h1>
      <div className="task">
        <p>Email:</p>
        <input
          {...register("email", {
            required: "Поле обязательно для заполнения",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "Введите корректный email",
            },
          })}
        />
      </div>
      <p>{errors.email?.message}</p>

      <div className="task">
        <p>Пароль:</p>
        <input
          type="password"
          {...register("password", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 6,
              message: "Введите корректный пароль",
            },
            pattern: {
              value: /[A-Z]/,
              message: "Введите корректный пароль",
            },
          })}
        />
      </div>
      <p>{errors.password?.message}</p>
      {error && <p>{error}</p>}
      <button type="submit">Войти</button>
    </form>
  );
}

export { AuthForm };
