import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormContainer, Form, Input, Button, ErrorMessage } from "./style";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://127.0.0.1:8000/api/users/", {
        username: data.name,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        reset();
        toast.success(
          "Email de confirmação enviado! Verifique sua caixa de entrada."
        );
      })
      .catch((error) => {
        console.log("teste");
        toast.error("teste");
        if (error.response) {
          if (error.response.data.username) {
            toast.error("Usuário com este nome já existe!");
          }
          if (error.response.data.email) {
            toast.error("Usuário com este e-mail já existe!");
          }
        } else if (error.request) {
          toast.error("Erro de conexão. Verifique sua rede.");
        } else {
          toast.error("Erro ao processar a requisição.");
        }
      });
  };

  const password = watch("password");

  return (
    <FormContainer>
      <h2>Registro de Usuário</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Nome"
          {...register("name", { required: "Nome é obrigatório" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

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
            minLength: {
              value: 6,
              message: "Senha deve ter pelo menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <Input
          type="password"
          placeholder="Confirmar Senha"
          {...register("confirmPassword", {
            required: "Confirmação de senha é obrigatória",
            validate: (value) =>
              value === password || "As senhas não coincidem",
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}

        <Button type="submit">Registrar</Button>
      </Form>

      <Link to="/login">Já possui registro?</Link>
    </FormContainer>
  );
};

export default Register;
