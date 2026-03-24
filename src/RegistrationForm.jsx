import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import api from "./api";
import { useNavigate } from "react-router";

function RegistrationForm() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await api.post("users/register", data);
      setError("");
      setIsSuccess(true);
      navigate("/auth");
    } catch (error) {
      setError(
        error.response.data.message || error.response.data.errors[0].msg
      );
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main">
      <h1>Регистрация</h1>
      {isSuccess && <p>Успешно зарегистрирован</p>}
      {error && <p>{error}</p>}
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
    </form>
  );
}

export { RegistrationForm };
