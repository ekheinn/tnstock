import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
  Loading,
  ProfilePicture,
} from "./style";
import Cookies from "js-cookie";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentProfilePicture, setCurrentProfilePicture] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token") || Cookies.get("token");

        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/profile/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setValue("username", response.data.username);
        setValue("email", response.data.email);
        setValue("description", response.data.description);

        console.log(response.data);
        if (response.data.profile_picture) {
          setCurrentProfilePicture(response.data.profile_picture);
        }
      } catch (error) {
        toast.error("Erro ao carregar perfil. Tente novamente.");
      }
    };

    fetchUserProfile();
  }, [setValue]);

  const onSubmit = (data) => {
    setLoading(true);

    const token = localStorage.getItem("token") || Cookies.get("token");

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("description", data.description);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    axios
      .patch("http://127.0.0.1:8000/api/users/profile/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Perfil atualizado com sucesso!");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            `Erro: ${
              error.response.data.message || "Erro ao atualizar perfil."
            }`
          );
        } else if (error.request) {
          toast.error("Erro de conexão. Verifique sua rede.");
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
      <h2>Editar Perfil</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProfilePicture
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : currentProfilePicture
          }
          alt="Foto de perfil"
        />

        <Input
          type="text"
          placeholder="Nome"
          {...register("username", { required: "Nome é obrigatório" })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}

        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0.9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          as="textarea"
          placeholder="Descrição"
          {...register("description")}
        />

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </Form>
      {loading && <Loading>Carregando...</Loading>}
    </Container>
  );
};

export default EditProfile;
