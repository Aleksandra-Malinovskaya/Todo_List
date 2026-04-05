import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authRequest,
  selectError,
  selectLoading,
  selectSuccess,
} from "./RTK/AuthSlice";
function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isSuccess = useSelector(selectSuccess);
  const loading = useSelector(selectLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token || isSuccess) {
      navigate("/todo");
    }
  }, [isSuccess]);
  const onSubmit = async (data) => {
    dispatch(authRequest(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Авторизация</h1>
          {error && <p>{error}</p>}
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
