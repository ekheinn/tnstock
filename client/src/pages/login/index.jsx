import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
  CheckboxContainer,
  CheckboxLabel,
} from "./style";
import Cookies from "js-cookie";

const Login = ({ setIsAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/login/", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
        } else {
          Cookies.set("token", res.data.token, { expires: 1 });
        }

        setIsAuthenticated(true);
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Erro ao processar a requisição.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          type="password"
          placeholder="Senha"
          {...register("password", {
            required: "Senha é obrigatória",
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <CheckboxContainer>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <CheckboxLabel htmlFor="rememberMe">Manter-me logado</CheckboxLabel>
        </CheckboxContainer>

        <Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </Form>

      <Link to="/register">Não possui registro?</Link>
      <Link to="/forgot-password">Esqueceu sua senha?</Link>
    </Container>
  );
};

export default Login;
