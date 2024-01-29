import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid, GridActionsCellItem, GridRowClassNameParams, GridRowId, GridToolbarContainer, GridToolbarExport, esES } from '@mui/x-data-grid';
import { iLConsulta, iLTrabajador, iLCliente, iLProcedimiento, iLTipoPago, iResponse } from '../../iType';
import dayjs from "dayjs";
import { URL_API } from '../../config';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Autocomplete } from '@mui/material';



function CrearConsulta() {


  const [formValues, setFormValues] = useState({
    ID_CONSULTA: "0",
    OBSERVACION: "",
    FECHA: "",
    ID_TRABAJADOR: "",
    ID_CLIENTE: "",
    ID_PROCEDIMIENTO: "",
    ID_TIPO_PAGO: ""
  });

  //Datos para la Lista
  const [lConsulta, setLConsulta] = useState<iLConsulta[]>([]);

  // SELECT LIST
  const [trabajadorSelect, setTrabajadorSelect] = useState<{ dTrabajador: iLTrabajador[] }>({ dTrabajador: [] });
  const [clienteSelect, setClienteSelect] = useState<{ dCliente: iLCliente[] }>({ dCliente: [] });
  const [proceSelect, setProceSelect] = useState<{ dProce: iLProcedimiento[] }>({ dProce: [] });
  const [pagoSelect, setPagoSelect] = useState<{ dPago: iLTipoPago[] }>({ dPago: [] });


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

  const selectCliente = () => {
    // Crear o modificar equipo
    fetch(`${URL_API}/select/cliente`)
      .then(resp => resp.json())
      .then((result: iLCliente[]) => {
        setClienteSelect({
          "dCliente": result
        });
      })
  }

  const selectProce = () => {
    // Crear o modificar equipo
    fetch(`${URL_API}/select/procedimiento`)
      .then(resp => resp.json())
      .then((result: iLProcedimiento[]) => {
        setProceSelect({
          "dProce": result
        });
      })
  }

  const selectTipoPago = () => {
    // Crear o modificar equipo
    fetch(`${URL_API}/select/tpago`)
      .then(resp => resp.json())
      .then((result: iLTipoPago[]) => {
        setPagoSelect({
          "dPago": result
        });
      })
  }


  const getConsulta = () => {
    // Crear o modificar equipo
    fetch(`${URL_API}/consulta/list`)
      .then(resp => resp.json())
      .then((result: iLConsulta[]) => {
        if (result.length > 0) {
          setLConsulta(result);
        }
      })
  }


  // ||||| ENVIOS DE DATOS |||||
  // event: React.FormEvent<HTMLFormElement>
  const SaveChanged = () => {
    // Crear o modificar
    fetch(`${URL_API}/consulta/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        "ID_CONSULTA": formValues.ID_CONSULTA,
        "OBSERVACION": formValues.OBSERVACION,
        "FECHA": formValues.FECHA,
        "ID_TRABAJADOR": formValues.ID_TRABAJADOR,
        "ID_CLIENTE": formValues.ID_CLIENTE,
        "ID_PROCEDIMIENTO": formValues.ID_PROCEDIMIENTO,
        "ID_TIPO_PAGO": formValues.ID_TIPO_PAGO
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
                ID_CONSULTA: "0",
                OBSERVACION: "",
                FECHA: "",
                ID_TRABAJADOR: trabajadorSelect.dTrabajador.length > 0 ? trabajadorSelect.dTrabajador[0].ID_TRABAJADOR : "",
                ID_CLIENTE: clienteSelect.dCliente.length > 0 ? clienteSelect.dCliente[0].ID_CLIENTE : "",
                ID_PROCEDIMIENTO: proceSelect.dProce.length > 0 ? proceSelect.dProce[0].ID_PROCEDIMIENTO : "",
                ID_TIPO_PAGO: pagoSelect.dPago.length > 0 ? pagoSelect.dPago[0].ID_TIPO_PAGO : ""
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
        getConsulta();
      })
  }

  const handleEditClick = (id: GridRowId) => () => {
    let itemSelected = lConsulta.find(item => item.ID_CONSULTA.toString() === id.toString());

    setFormValues({
      ...formValues,
      "ID_CONSULTA": itemSelected?.ID_CONSULTA || "0",
      "OBSERVACION": itemSelected?.OBSERVACION || "0",
      "FECHA": itemSelected?.FECHA || "0",
      "ID_TRABAJADOR": itemSelected?.ID_TRABAJADOR || "0",
      "ID_CLIENTE": itemSelected?.ID_CLIENTE || "0",
      "ID_PROCEDIMIENTO": itemSelected?.ID_PROCEDIMIENTO || "",
      "ID_TIPO_PAGO": itemSelected?.ID_TIPO_PAGO || ""
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
          fetch(`${URL_API}/consulta/delete`, {
            method: "POST",
            headers: {
              "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
              "ID_CONSULTA": id
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
              getConsulta();
            })
        }
      })
  };


  const gRows = () => {
    let result: {
      id: number,
      number: number,
      doctora: string,
      ncliente: string,
      apPaterno: string,
      apMaterno: string,
      proce: string,
      obs: string,
      pago: string,
      precio: string,
      fecha: string,
      estado: string,
      state: string
    }[] = [];
    lConsulta && lConsulta.forEach((item, index) => {
      result.push({
        id: parseInt(item.ID_CONSULTA),
        number: index + 1,
        doctora: item.DOCTORA || "-",
        ncliente: item.NOMBRE_CLIENTE,
        apPaterno: item.APPATERNO,
        apMaterno: item.APMATERNO,
        proce: item.NOM_PROCEDIMIENTO,
        obs: item.OBSERVACION,
        pago: item.TIPO_PAGO,
        precio: item.PRECIO,
        fecha: item.FECHA_CONSULTA,
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
    selectCliente();
    selectProce();
    selectTipoPago();
    getConsulta();
  }, []);



  return (
    <Grid container spacing={2} justifyContent={"center"} id='crudAll'>
      <Grid xs={4} className='container-duplex'>
        <form onSubmit={(e) => { e.preventDefault(); SaveChanged(); }}>
          <FormControl fullWidth>
            <InputLabel id="selTrabajador"></InputLabel>
            <Autocomplete
              fullWidth
              options={trabajadorSelect?.dTrabajador || []}
              getOptionLabel={(option: iLTrabajador) => option.NOMBRES}
              value={trabajadorSelect?.dTrabajador.find((trabajador) => trabajador.ID_TRABAJADOR === formValues.ID_TRABAJADOR) || null}
              onChange={(event, newValue) => {
                setFormValues((prevValues) => ({
                  ...prevValues,
                  ['ID_TRABAJADOR']: newValue ? newValue.ID_TRABAJADOR : ''
                }));
              }}
              renderInput={(params) => <TextField {...params} label="Trabajador" />}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="selCliente"></InputLabel>
            <Autocomplete
              fullWidth
              options={clienteSelect?.dCliente || []}
              getOptionLabel={(option: iLCliente) => option.NOMBRES}
              value={clienteSelect?.dCliente.find((cliente) => cliente.ID_CLIENTE === formValues.ID_CLIENTE) || null}
              onChange={(event, newValue) => {
                setFormValues((prevValues) => ({
                  ...prevValues,
                  ['ID_CLIENTE']: newValue ? newValue.ID_CLIENTE : ''
                }));
              }}
              renderInput={(params) => <TextField {...params} label="Cliente" />}
            />
          </FormControl>

          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="selProcedimiento"></InputLabel>
            <Autocomplete
              fullWidth
              options={proceSelect?.dProce || []}
              getOptionLabel={(option: iLProcedimiento) => option.NOM_PROCEDIMIENTO}
              value={proceSelect?.dProce.find((procedimiento) => procedimiento.ID_PROCEDIMIENTO === formValues.ID_PROCEDIMIENTO) || null}
              onChange={(event, newValue) => {
                setFormValues((prevValues) => ({
                  ...prevValues,
                  ['ID_PROCEDIMIENTO']: newValue ? newValue.ID_PROCEDIMIENTO : ''
                }));
              }}
              renderInput={(params) => <TextField {...params} label="Procedimiento" />}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="selTipoPago">Tipo de Pago</InputLabel>
            <Select
              labelId="Tipo de Pago"
              name='ID_TIPO_PAGO'
              value={formValues.ID_TIPO_PAGO}
              label="Tipo de Pago"
              onChange={handleChangeSelect}
            >
              {
                pagoSelect?.dPago &&
                pagoSelect?.dPago.map((item, index) => (
                  <MenuItem key={index} value={item.ID_TIPO_PAGO}>{item.DESCRIPCION}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              required
              name="OBSERVACION"
              label="Obervacion"
              placeholder=''
              autoComplete='off'
              inputProps={{ maxLength: 100 }}
              value={formValues.OBSERVACION}
              onChange={handleChange}
            />
            <br />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <TextField
              required
              name="FECHA"
              type='date'
              placeholder=''
              autoComplete='off'
              inputProps={{ maxLength: 100 }}
              value={formValues.FECHA}
              onChange={handleChange}
            />
            <br />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#D9A3FF", maxWidth: 250, fontWeight: "bold", margin: "auto" }}
            >
              {
                formValues.ID_CONSULTA !== "0" ?
                  "Actualizar" : "Registrar"
              }
            </Button>
            <br />
            {
              formValues.ID_CONSULTA !== "0" &&
              <Button
                type="button"
                variant="contained"
                color="warning"
                onClick={() => {
                  setFormValues({
                    ID_CONSULTA: "0",
                    OBSERVACION: '',
                    FECHA: '',
                    ID_TRABAJADOR: '',
                    ID_CLIENTE: '',
                    ID_PROCEDIMIENTO: '',
                    ID_TIPO_PAGO: ''
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
            { field: "doctora", headerName: 'DOCTORA', minWidth: 200 },
            { field: "ncliente", headerName: 'CLIENTE', minWidth: 200 },
            { field: "apPaterno", headerName: 'APPATERNO', minWidth: 150 },
            { field: "apMaterno", headerName: 'APMATERNO', minWidth: 150 },
            { field: "proce", headerName: 'PROCEDIMIENTO', minWidth: 200 },
            { field: "obs", headerName: 'OBSERVACION', minWidth: 200 },
            { field: "pago", headerName: 'TIPO_PAGO', minWidth: 150 },
            { field: "precio", headerName: 'PRECIO', minWidth: 150 },
            { field: "fecha", headerName: 'FECHA', minWidth: 150 },
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


export default CrearConsulta