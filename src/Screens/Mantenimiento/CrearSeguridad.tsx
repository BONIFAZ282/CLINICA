import { useState, useEffect } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid, GridActionsCellItem, GridRowClassNameParams, GridRowId, GridToolbarContainer, GridToolbarExport, esES } from '@mui/x-data-grid';
import { iLSeguridad, iResponse } from '../../iType';
import { URL_API } from '../../config';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

function CrearSeguridad() {


    const [formValues, setFormValues] = useState({
        ID_SEGURIDAD: "0",
        NOMBRES: "",
        APPATERNO: "",
        APMATERNO: "",
        DOCUMENTO: "",
        CODIGO: ""
    });

    const [lSeguridad, setLSeguridad] = useState<iLSeguridad[]>([]);

    // ||||| EVENTOS  ||||||||
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value.trimStart(),
        }));
    };

    // ||||| RECEPCION DE DATOS |||||
    const getSeguridad = () => {
        // Crear o modificar equipo
        fetch(`${URL_API}/seguridad/list`)
            .then(resp => resp.json())
            .then((result: iLSeguridad[]) => {
                if (result.length > 0) {
                    setLSeguridad(result);
                }
            })
    }




    // ||||| ENVIOS DE DATOS |||||

    // event: React.FormEvent<HTMLFormElement>
    const SaveChanged = () => {
        // Crear o modificar
        fetch(`${URL_API}/seguridad/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                "ID_SEGURIDAD": formValues.ID_SEGURIDAD,
                "NOMBRES": formValues.NOMBRES.trim(),
                "APPATERNO": formValues.APPATERNO.trim(),
                "APMATERNO": formValues.APMATERNO.trim(),
                "DOCUMENTO": formValues.DOCUMENTO.trim(),
                "CODIGO": formValues.CODIGO.trim()
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
                                ID_SEGURIDAD: "0",
                                NOMBRES: '',
                                APPATERNO: '',
                                APMATERNO: '',
                                DOCUMENTO: '',
                                CODIGO: ''
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
                getSeguridad();
            })
    }


    const handleEditClick = (id: GridRowId) => () => {
        let itemSelected = lSeguridad.find(item => item.ID_SEGURIDAD.toString() === id.toString());

        setFormValues({
            ...formValues,
            "ID_SEGURIDAD": itemSelected?.ID_SEGURIDAD || "0",
            "NOMBRES": itemSelected?.NOMBRES || "",
            "APPATERNO": itemSelected?.APPATERNO || "",
            "APMATERNO": itemSelected?.APMATERNO || "",
            "DOCUMENTO": itemSelected?.DOCUMENTO || "",
            "CODIGO": itemSelected?.CODIGO || ""

        })
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
                    fetch(`${URL_API}/seguridad/delete`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json;charset=UTF-8",
                        },
                        body: JSON.stringify({
                            "ID_SEGURIDAD": id
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
                            getSeguridad();
                        })
                }
            })
    };


    const gRows = () => {
        let result: { id: number, number: number, nombres: string, appterno: string, apmaterno: string, dni: string, codigo: string, estado: string, state: string }[] = [];
        lSeguridad && lSeguridad.forEach((item, index) => {
            result.push({
                id: parseInt(item.ID_SEGURIDAD),
                number: index + 1,
                nombres: item.NOMBRES || "-",
                appterno: item.APPATERNO || "-",
                apmaterno: item.APMATERNO || "-",
                dni: item.DOCUMENTO || "-",
                codigo: item.CODIGO || "-",
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
        getSeguridad()
    }, []);

    return (
        <Grid container spacing={2} justifyContent={"center"} id='crudAll'>
          <Grid xs={4} className='container-duplex'>
            <form onSubmit={(e) => { e.preventDefault(); SaveChanged(); }}>
              <FormControl fullWidth>
                <TextField
                  required
                  name="NOMBRES"
                  label="Nombres"
                  placeholder=''
                  autoComplete='off'
                  inputProps={{ maxLength: 100 }}
                  value={formValues.NOMBRES}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  required
                  name="APPATERNO"
                  label="Apellido Paterno"
                  placeholder=''
                  autoComplete='off'
                  inputProps={{ maxLength: 100 }}
                  value={formValues.APPATERNO}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  required
                  name="APMATERNO"
                  label="Apellido Materno"
                  placeholder=''
                  autoComplete='off'
                  inputProps={{ maxLength: 100 }}
                  value={formValues.APMATERNO}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  required
                  name="DOCUMENTO"
                  label="Documento"
                  placeholder=''
                  autoComplete='off'
                  inputProps={{ maxLength: 100 }}
                  value={formValues.DOCUMENTO}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  required
                  name="CODIGO"
                  label="Codigo"
                  placeholder=''
                  autoComplete='off'
                  inputProps={{ maxLength: 100 }}
                  value={formValues.CODIGO}
                  onChange={handleChange}
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  style={{ backgroundColor: "#9692F5", maxWidth: 250, fontWeight: "bold", margin: "auto" }}
                >
                  {
                    formValues.ID_SEGURIDAD !== "0" ?
                      "Actualizar" : "Registrar"
                  }
                </Button>
                <br />
                {
                  formValues.ID_SEGURIDAD !== "0" &&
                  <Button
                    type="button"
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setFormValues({
                        ID_SEGURIDAD: "0",
                        NOMBRES: '',
                        APPATERNO: '',
                        APMATERNO: '',
                        DOCUMENTO: '',
                        CODIGO: ''

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
                { field: "number", headerName: "N°" },
                { field: "nombres", headerName: 'NOMBRES', minWidth: 200 },
                { field: "appterno", headerName: 'APELLIDO PATERNO', minWidth: 200 },
                { field: "apmaterno", headerName: 'APELLIDO MATERNO', minWidth: 200 },
                { field: "dni", headerName: 'DOCUMENTO', minWidth: 200 },
                { field: "codigo", headerName: 'CODIGO', minWidth: 200 },
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

export default CrearSeguridad