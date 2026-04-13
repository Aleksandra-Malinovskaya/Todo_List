import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { authUser } from "./apiUser";
function AuthForm() {
  const navigate = useNavigate();
  const auth = useMutation({
    mutationFn: (data) => authUser(data),
    onSuccess: (responseData) => {
      const token = responseData.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/todo");
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todo");
    }
  }, []);
  const onSubmit = (data) => {
    auth.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main">
      {auth.isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Авторизация</h1>
          {auth.error && <p>{auth.error.message}</p>}
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
          <button type="submit">Войти</button>
          <br />
          <button onClick={() => navigate("/")}>Пройти регистрацию</button>
        </>
      )}
    </form>
  );
}

export { AuthForm };
