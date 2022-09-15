import {
  Button,
  Modal,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  Container,
  TableRow,
  Box,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { http } from "../libs/axios";

const User = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [modalType, setModalType] = useState("");
  const [fields, setFields] = useState({});
  const [users, setUsers] = useState([]);
  const [fieldsUpdate, setFieldsUpdate] = useState({});

  const modalOpen = (user, type) => {
    type === "edit" && setFieldsUpdate(user)
    setSelectedUser(user);
    setModalType(type);
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await http.post("/usuarios", fields);
      console.log(response.status);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await http.put(
        `/usuarios/${selectedUser.uuid}`,
        fieldsUpdate
      );
      console.log(response.status);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleChangeUpdate = (event) => {
    const { value, name } = event.target;
    setFieldsUpdate({ ...fieldsUpdate, [name]: value });
  };

  const handleDelete = async () => {
    try {
      const response = await http.delete(`/usuarios/${selectedUser.uuid}`);
      console.log(response.status);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await http.get("/usuarios");
        setUsers(response.data.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getUsers();
  }, []);
  console.log(users);
  return (
    <>
      <Container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Matricula</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Data de nascimento</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            {users?.map((user) => (
              <TableBody key={user.registration}>
                <TableRow>
                  <TableCell>{user.registration}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birth}</TableCell>
                  <TableCell>
                    <Button onClick={() => modalOpen(user, "edit")}>
                      Editar
                    </Button>
                    <Button
                      color="error"
                      onClick={() => modalOpen(user, "delete")}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <Button onClick={() => modalOpen(null, "create")}>Criar usuário</Button>
      </Container>
      <Modal open={open} onClose={modalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 10,
            p: 3,
            borderRadius: 1,
          }}
        >
          {modalType === "create" && (
            <form onSubmit={(event) => handleCreate(event)}>
              <TextField
                id="name"
                label="Nome"
                value={fields.name}
                type="text"
                name="name"
                onChange={handleChange}
                required
              />
              <TextField
                id="email"
                label="E-mail"
                value={fields.email}
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
              <TextField
                id="password"
                label="Senha"
                type="password"
                name="password"
                value={fields.password}
                onChange={handleChange}
                required
              />
              <TextField
                id="birth"
                label="Data de Nascimento"
                value={fields.birth}
                type="date"
                name="birth"
                onChange={handleChange}
                required
              />
              <Button type="submit">Criar</Button>
            </form>
          )}
          {modalType === "edit" && (
            <div>
              <TextField
                id="name"
                label="Nome"
                type="text"
                name="name"
                value={fieldsUpdate.name}
                onChange={handleChangeUpdate}
                required
              />
              <TextField
                id="email"
                label="E-mail"
                type="email"
                name="email"
                value={fieldsUpdate.email}
                onChange={handleChangeUpdate}
                required
              />
              <TextField
                id="password"
                label="Senha"
                type="password"
                name="password"
                value={fieldsUpdate?.password}
                onChange={handleChangeUpdate}
              />
              <TextField
                id="birth"
                label="Data de Nascimento"
                type="date"
                name="birth"
                value={fieldsUpdate.birth}
                onChange={handleChangeUpdate}
                required
              />
              <Button onClick={modalClose}>Cancelar</Button>
              <Button onClick={handleUpdate}>
                Atualizar
              </Button>
            </div>
          )}
          {modalType === "delete" && (
            <>
              <div>Deseja realmente excluir usuário?</div>
              <Button onClick={modalClose}>Cancelar</Button>
              <Button onClick={handleDelete} color="error">
                Excluir
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default User;
