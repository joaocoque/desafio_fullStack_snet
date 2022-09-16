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
  FormControl,
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
  const [filter, setFilter] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await http.get("/usuarios", { params: filter });
        setUsers(response.data.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getUsers();
  }, [filter, open]);

  console.log(filter);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter({ name: e.target.search.value });
  };

  const resetFields = () => {
    setFields("");
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await http.post("/usuarios", fields);
      setOpen(false);
      resetFields();
    } catch (err) {
      setErrors(err?.response?.data?.data);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await http.put(`/usuarios/${selectedUser.uuid}`, fieldsUpdate);
      setOpen(false);
    } catch (err) {
      setErrors(err.response.data.data);
    }
  };

  const handleDelete = async () => {
    try {
      await http.delete(`/usuarios/${selectedUser.uuid}`);
      setOpen(false);
    } catch (err) {
      console.log(err.response?.data);
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

  const modalOpen = (user, type) => {
    type === "edit" && setFieldsUpdate(user);
    setSelectedUser(user);
    setModalType(type);
    setOpen(true);
  };

  const modalClose = () => {
    setFields({});
    setErrors({});
    setOpen(false);
  };

  console.log(users);
  return (
    <>
      <Container>
        <div className="boxInput">
          <div className="inputGroup">
            <form onSubmit={(e) => handleSearch(e)}>
              <TextField
                variant="outlined"
                size="small"
                type="search"
                name="search"
                id="search"
              />
              <Button variant="outlined" size="large" type="submit">
                Buscar
              </Button>
            </form>
          </div>
          <Button
            variant="contained"
            size="large"
            onClick={() => modalOpen(null, "create")}
          >
            Criar usuário
          </Button>
        </div>

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
            <form
              className="modalAlign"
              onSubmit={(event) => handleCreate(event)}
            >
              <div className="modalAlign">
                <TextField
                  id="name"
                  label="Nome"
                  value={fields.name}
                  type="text"
                  name="name"
                  error={errors?.name}
                  helperText={errors?.name?.toString()}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="email"
                  label="E-mail"
                  value={fields.email}
                  type="email"
                  name="email"
                  error={errors?.email}
                  helperText={errors?.email?.toString()}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="password"
                  label="Senha"
                  type="password"
                  name="password"
                  value={fields.password}
                  error={errors?.password}
                  helperText={errors?.password?.toString()}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="birth"
                  label="Data de Nascimento"
                  value={fields.birth}
                  type="date"
                  name="birth"
                  error={errors?.birth}
                  helperText={errors?.birth?.toString()}
                  onChange={handleChange}
                  required
                />
                <Button variant="contained" type="submit">
                  Criar
                </Button>
              </div>
            </form>
          )}
          {modalType === "edit" && (
            <div className="modalAlign">
              <TextField
                id="name"
                label="Nome"
                type="text"
                name="name"
                value={fieldsUpdate.name}
                error={errors?.name}
                helperText={errors?.name?.toString()}
                onChange={handleChangeUpdate}
                required
              />
              <TextField
                id="email"
                label="E-mail"
                type="email"
                name="email"
                value={fieldsUpdate.email}
                error={errors?.email}
                helperText={errors?.email?.toString()}
                onChange={handleChangeUpdate}
                required
              />
              <TextField
                id="password"
                label="Senha"
                type="password"
                name="password"
                value={fieldsUpdate?.password}
                error={errors?.password}
                helperText={errors?.password?.toString()}
                onChange={handleChangeUpdate}
              />
              <TextField
                id="birth"
                label="Data de Nascimento"
                type="date"
                name="birth"
                value={fieldsUpdate.birth}
                error={errors?.birth}
                helperText={errors?.birth?.toString()}
                onChange={handleChangeUpdate}
                required
              />
              <Button variant="outlined" color="error" onClick={modalClose}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Atualizar
              </Button>
            </div>
          )}
          {modalType === "delete" && (
            <>
              <div className="modalAlignDelete">
                Deseja realmente excluir usuário?
              </div>
              <div className="buttons">
                <Button variant="contained" size="large" onClick={modalClose}>
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleDelete}
                  color="error"
                >
                  Excluir
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default User;
