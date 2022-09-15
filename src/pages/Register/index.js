import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { Layout } from "../../layout";
import { Container, Content } from "./styles";
import { createStudent } from "../../service/v1/students-sevice";
import { useEffect, useState } from "react";
import { createClass } from "../../service/v1/classes-service";
import { getAllMounthStatistics, updateMounthStatistics } from "../../service/v1/mounths-service";

export function Register() {
  const [mounths, setMounths] = useState();
  const [isLoading, setIsLoadind] = useState(false);
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      selectForm: "",
    },
  });
  const selectForm = watch("selectForm");
  console.log(selectForm);

  async function getMounthStatistics() {
    try {
      const data = await getAllMounthStatistics();
      setMounths(data);
    } catch {
      console.log("deu erro");
    }
  }
console.log(mounths);
  async function onSubmit({
    nameUser,
    emailUser,
    className,
    teacher,
    selectMounth,
  }) {
    if (selectForm === "Student") {
      try {
        setIsLoadind(true);
        await createStudent({
          nameUser,
          emailUser,
          entryMounth: selectMounth,
        });
        await updateMounthStatistics(selectMounth, {
          obj: mounths.find((item) => item.id.toString === selectMounth),
        });

        history("/");
      } catch {
        console.log("Deu erro!");
      } finally {
        setIsLoadind(false);
      }
    } else {
      try {
        setIsLoadind(true);
        await createClass({ className, teacher });
        history("/");
      } catch {
        console.log("Deu erro!");
      } finally {
        setIsLoadind(false);
      }
    }
  }

  useEffect(() => {
    (async () => {
      await getMounthStatistics();
    })();
  }, []);

  return (
    <Layout>
      <Container>
        <h1>Dashboard ╽ Register</h1>
        <Content>
          <select {...register("selectForm")}>
            <option value="">Choose yout form</option>
            <option value="Student">Student</option>
            <option value="class">class</option>
          </select>
          {isLoading ? "Loading..." : null}

          {selectForm != "" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              {selectForm === "Student" ? (
                <>
                  <label htmlFor="nameUser">Student</label>
                  <input
                    type="text"
                    {...register("nameUser", { required: true })}
                  />
                  <span>{errors.nameUser && "* Field required"}</span>
                  <br></br>
                  <label htmlFor="email">E-mail</label>
                  <input type="email" {...register("emailUser")} />
                  <br></br>
                  <label htmlFor="selectMounth">Select mounth entry</label>
                  <select {...register("selectMounth")}>
                    {mounths.map((mounth, id) => (
                      <option key={mounth} value={id + 1}>
                        {mounth}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <label htmlFor="className">Class</label>
                  <input
                    type="text"
                    {...register("className", { required: true })}
                  />
                  <span>{errors.className && "* Field required"}</span>
                  <br></br>
                  <label htmlFor="teacher">Teacher</label>
                  <input
                    type="text"
                    {...register("teacher", { required: true })}
                  />
                </>
              )}
              <button type="submit">Enviar</button>
            </form>
          ) : null}
        </Content>
      </Container>
    </Layout>
  );
}
