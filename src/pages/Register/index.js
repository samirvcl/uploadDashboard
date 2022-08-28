import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { Layout } from "../../layout";
import { Container, Content } from "./styles";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    try {

    } catch {
      console.log("Deu erro!")
    }
  }
  return (
    <Layout>
      <Container>
        <h1>Dashboard ╽ Register</h1>
        <Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nameUser">Student</label>
            <input type="text" {...register("nameUser", { required: true })} />
            <span>{errors.nameUser && "* Fild required"}</span>
            <br></br>
            <label htmlFor="nameUser">E-mail</label>
            <input type="email" {...register("emailUser")} />

            <button type="submit">Enviar</button>
          </form>
        </Content>
      </Container>
    </Layout>
  );
}
