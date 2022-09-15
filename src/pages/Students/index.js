import { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/Table";
import { Layout } from "../../layout";
import { getAllStudents } from "../../service/v1/students-sevice";
import { Container, Content } from "./styles";

export function Students() {
  const [students, setStudents] = useState([]);

  async function getStudents() {
    try {
      const data = await getAllStudents();
      if (data.length === 0) {
        console.log("Não tem dados");
      }
      setStudents(data);
    } catch {
      console.log("Deu erro!");
    }
  }

  useEffect(() => {
    (async () => {
      await getStudents();
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Student",
        accerssor: "nameUser",
        Cell: ({ row }) => {
          return <h1 style={{fontSize: "2rem"}}>{row.original.nameUser}</h1>;
        },
      },
      {
        Header: "E-mail",
        accerssor: "emailUser",
        Cell: ({ row }) => {
          return <h1 style={{fontSize: "1.7rem"}}>{row.original.emailUser}</h1>;
        },
      },
    ],
    []
  );

  return (
    <Layout>
      <Container>
        <h1>Dashboard ╽ Students</h1>
        <Content>
          <Table data={students} columns={columns} />
        </Content>
      </Container>
    </Layout>
  );
}
