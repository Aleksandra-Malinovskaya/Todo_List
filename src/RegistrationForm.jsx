import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { regUser } from "./apiUser";

function RegistrationForm() {
  const navigate = useNavigate();
  const registration = useMutation({
    mutationFn: (data) => regUser(data),
    onSuccess: () => {
      navigate("/auth");
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
  }, [registration.isSuccess]);
  const onSubmit = (data) => {
    data.age = Number(data.age);
    registration.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main">
      {registration.isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Регистрация</h1>
          {registration.error && <p>{registration.error.message}</p>}
          <div className="task">
            <p>Логин:</p>
            <input
              type="text"
              {...register("username", {
                required: "Обязательное поле",
              })}
            />
          </div>
          <p>{errors.username?.message}</p>

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

          <div className="task">
            <p>Пол:</p>
            <select
              type="gender"
              {...register("gender", {
                required: "Выберите пол",
              })}
            >
              <option value={""}>Выберите пол</option>
              <option value={"male"}>Мужской</option>
              <option value={"female"}>Женский</option>
            </select>
          </div>
          <p>{errors.gender?.message}</p>

          <div className="task">
            <p>Возраст:</p>
            <input
              type="number"
              {...register("age", {
                required: "Обязательное поле",
                pattern: {
                  value: /^[0-9]/,
                  message: "Только цифры",
                },
                min: {
                  value: 18,
                  message: "Не менее 18-ти",
                },
              })}
            />{" "}
          </div>
          <p>{errors.age?.message}</p>

          <button type="submit">Отправить</button>

          <button onClick={() => navigate("/auth")}>Пройти авторизацию</button>
        </>
      )}
    </form>
  );
}

export { RegistrationForm };
