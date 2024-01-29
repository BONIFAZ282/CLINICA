import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid, GridActionsCellItem, GridRowClassNameParams, GridRowId, GridToolbarContainer, GridToolbarExport, esES } from '@mui/x-data-grid';
import { iLUsuarios, iLTrabajador, iLPrivilegio, iResponse } from '../../iType';
import dayjs from "dayjs";
import { URL_API } from '../../config';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';


function CrearUsuario() {

  const [formValues, setFormValues] = useState({
    ID_USUARIO: "0",
    ID_TRABAJADOR: "",
    ID_PRIVILEGIO: "",
    CONTRASENIA: ""
  });

  // Datos para la lista
  const [lUsuarios, setLUsuarios] = useState<iLUsuarios[]>([]);

  // Select List
  const [privilegioSelect, setPrivilegioSelect] = useState<{ dPrivilegio: iLPrivilegio[] }>({ dPrivilegio: [] });
  const [trabajadorSelect, setTrabajadorSelect] = useState<{ dTrabajador: iLTrabajador[] }>({ dTrabajador: [] });


  // ||||| EVENTOS  ||||||||
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.trimStart(),
    }));
  };

  // SelectChangeEvent
  const handleChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };



  // ||||| RECEPCION DE DATOS |||||
  const selectTrabajador = () => {
    // Crear o modificar equipo
    fetch(`${URL_API}/select/trabajador`)
      .then(resp => resp.json())
      .then((result: iLTrabajador[]) => {
        setTrabajadorSelect({
          "dTrabajador": result
        });
      })
  }

  const selectPrivilegio = () => {
    // Crear o modificar equipo
    fetch(`${URL_API}/select/privilegio`)
      .then(resp => resp.json())
      .then((result: iLPrivilegio[]) => {
        setPrivilegioSelect({
          "dPrivilegio": result
        });
      })
  }

  const getUsuario = () => {
    // Crear o modificar equipo
    fetch(`${URL_API}/usuario/list`)
      .then(resp => resp.json())
      .then((result: iLUsuarios[]) => {
        if (result.length > 0) {
          setLUsuarios(result);
        }
      })
  }



  // ||||| ENVIOS DE DATOS |||||
  // event: React.FormEvent<HTMLFormElement>
  const SaveChanged = () => {
    // Crear o modificar
    fetch(`${URL_API}/usuario/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        "ID_USUARIO": formValues.ID_USUARIO,
        "ID_TRABAJADOR": formValues.ID_TRABAJADOR,
        "ID_PRIVILEGIO": formValues.ID_PRIVILEGIO,
        "CONTRASENIA": formValues.CONTRASENIA
      }),
    })
      .then(resp => resp.json())
      .then((result: iResponse) => {
        Swal.fire({
          icon: result.icon as SweetAlertIcon,
          title: result.title,
          text: result.text
        }).then((resp) => {
          if (resp.isConfirmed) {
            // Limpiar inputs
            if (result.statusCode === "201" || result.statusCode === "202") {
              setFormValues({
                ID_USUARIO: "0",
                ID_TRABAJADOR: trabajadorSelect.dTrabajador.length > 0 ? trabajadorSelect.dTrabajador[0].ID_TRABAJADOR : "",
                ID_PRIVILEGIO: privilegioSelect.dPrivilegio.length > 0 ? privilegioSelect.dPrivilegio[0].ID_PRIVILEGIO : "",
                CONTRASENIA: ""
              });
            }
          }
        })
      })
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: err
        })
      )
      .finally(() => {
        getUsuario();
      })
  }

  const handleEditClick = (id: GridRowId) => () => {
    let itemSelected = lUsuarios.find(item => item.ID_USUARIO.toString() === id.toString());

    setFormValues({
      ...formValues,
      "ID_USUARIO": itemSelected?.ID_USUARIO || "0",
      "ID_TRABAJADOR": itemSelected?.ID_TRABAJADOR || "0",
      "ID_PRIVILEGIO": itemSelected?.ID_PRIVILEGIO || "0",
      "CONTRASENIA": itemSelected?.CONTRASENIA || ""
    });
  }


  const handleDeleteClick = (id: GridRowId) => () => {
    Swal.fire({
      icon: 'question',
      title: 'MENSAJE DEL SISTEMA',
      text: '¿Seguro que desea eliminar el siguiente elemento?',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      showDenyButton: true
    })
      .then((resp) => {
        if (resp.isConfirmed) {
          fetch(`${URL_API}/usuario/delete`, {
            method: "POST",
            headers: {
              "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
              "ID_USUARIO": id
            }),
          })
            .then(resp => resp.json())
            .then((result: iResponse) => {
              Swal.fire({
                icon: result.icon as SweetAlertIcon,
                title: result.title,
                text: result.text
              });
            }).finally(() => {
              getUsuario();
            })
        }
      })
  };


  const gRows = () => {
    let result: {
      id: number,
      number: number,
      nombres: string,
      apPaterno: string,
      apMaterno: string,
      documento: string,
      nomPrivilegio: string,
      estado: string,
      state: string
    }[] = [];
    lUsuarios && lUsuarios.forEach((item, index) => {
      result.push({
        id: parseInt(item.ID_USUARIO),
        number: index + 1,
        nombres: item.NOMBRES || "-",
        apPaterno: item.APPATERNO,
        apMaterno: item.APMATERNO,
        documento: item.DOCUMENTO,
        nomPrivilegio: item.NOMBRE_PRIVILEGIO,
        estado: item.ESTADO === "0" ? "ELIMINADO" : "ACTIVO",
        state: item.ESTADO
      });
    }
    )
    return result;
  }




  // ||||| MINICOMPONENTES ||||||
  // Exportar tabla
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const getRowClassName = (params: GridRowClassNameParams<{ state: string }>) => {
    // Condición para aplicar estilos a una fila específica
    if (params.row.state === "0") {
      return 'remove-row'; // Clase CSS personalizada para la fila
    }
    return ''; // Sin estilos adicionales para las demás filas
  };

  useEffect(() => {
    selectTrabajador();
    selectPrivilegio();
    getUsuario();
  }, []);






  return (
    <Grid container spacing={2} justifyContent={"center"} id='crudAll'>
      <Grid xs={4} className='container-duplex'>
        <form onSubmit={(e) => { e.preventDefault(); SaveChanged(); }}>
          <FormControl fullWidth>
            <InputLabel id="selTrabajador">Trabajador</InputLabel>
            <Select
              labelId="selTrabajador"
              name='ID_TRABAJADOR'
              value={formValues.ID_TRABAJADOR}
              label="Trabajador"
              onChange={handleChangeSelect}
            >
              {
                trabajadorSelect?.dTrabajador &&
                trabajadorSelect?.dTrabajador.map((item, index) => (
                  <MenuItem key={index} value={item.ID_TRABAJADOR}>{item.NOMBRES}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="selPrivilegio">Privilegio</InputLabel>
            <Select
              labelId="selPrivilegio"
              name='ID_PRIVILEGIO'
              value={formValues.ID_PRIVILEGIO}
              label="Privilegio"
              onChange={handleChangeSelect}
            >
              {
                privilegioSelect?.dPrivilegio &&
                privilegioSelect?.dPrivilegio.map((item, index) => (
                  <MenuItem key={index} value={item.ID_PRIVILEGIO}>{item.DESCRIPCION}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              required
              name="CONTRASENIA"
              label="CONTRASENIA"
              placeholder=''
              autoComplete='off'
              inputProps={{ maxLength: 100 }}
              value={formValues.CONTRASENIA}
              onChange={handleChange}
            />
            <br />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#D9A3FF", maxWidth: 250, fontWeight: "bold", margin: "auto" }}
            >
              {
                formValues.ID_USUARIO !== "0" ?
                  "Actualizar" : "Registrar"
              }
            </Button>
            <br />
            {
              formValues.ID_USUARIO !== "0" &&
              <Button
                type="button"
                variant="contained"
                color="warning"
                onClick={() => {
                  setFormValues({
                    ID_USUARIO: "0",
                    ID_TRABAJADOR: '',
                    ID_PRIVILEGIO: '',
                    CONTRASENIA: ''
                  });
                }}
                style={{ maxWidth: 250, fontWeight: "bold", margin: "auto" }}
              >
                Cancelar
              </Button>
            }
          </FormControl>
        </form>
      </Grid>
      <Grid xs={8}>
        <DataGrid
          editMode="row"
          columns={[
            { field: "number", headerName: "N°", minWidth: 50 },
            { field: "documento", headerName: 'DNI', minWidth: 100 },
            { field: "nombres", headerName: 'NOMBRES', minWidth: 200 },
            { field: "apMaterno", headerName: 'AP. PATERNO', minWidth: 150 },
            { field: "apPaterno", headerName: 'AP. MATERNO', minWidth: 150 },
            { field: "nomPrivilegio", headerName: 'PRIVILEGIO', minWidth: 200 },
            { field: "estado", headerName: 'ESTADO', minWidth: 150 },
            {
              field: 'actions',
              type: 'actions',
              headerName: 'Acciones',
              width: 100,
              cellClassName: 'actions',
              getActions: ({ id, row }) => {
                return [
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                    disabled={row.state === "0"}
                  />,
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    className='deleteAction'
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                    disabled={row.state === "0"}
                  />,
                ];
              },
            },
          ]}
          getRowClassName={getRowClassName}
          rows={gRows()}
          slots={{
            toolbar: CustomToolbar,
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
    </Grid>
  )
}

export default CrearUsuario