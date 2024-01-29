import { useState, useEffect } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid, GridActionsCellItem, GridRowClassNameParams, GridRowId, GridToolbarContainer, GridToolbarExport, esES } from '@mui/x-data-grid';
import { iLPrivilegio, iResponse } from '../../iType';
import { URL_API } from '../../config';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

function CrearPrivilegio() {

    const [formValues, setFormValues] = useState({
        ID_PRIVILEGIO: "0",
        DESCRIPCION: ""
    });



    const [lPrivilegio, setLPrivilegio] = useState<iLPrivilegio[]>([]);

    // ||||| EVENTOS  ||||||||
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value.trimStart(),
        }));
    };

    // ||||| RECEPCION DE DATOS |||||
    const getPrivilegio = () => {
        // Crear o modificar equipo
        fetch(`${URL_API}/privilegio/list`)
            .then(resp => resp.json())
            .then((result: iLPrivilegio[]) => {
                if (result.length > 0) {
                    setLPrivilegio(result);
                }
            })
    }

    
  // ||||| ENVIOS DE DATOS |||||

  // event: React.FormEvent<HTMLFormElement>
  const SaveChanged = () => {
    // Crear o modificar
    fetch(`${URL_API}/privilegio/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        "ID_PRIVILEGIO": formValues.ID_PRIVILEGIO,
        "DESCRIPCION": formValues.DESCRIPCION.trim()
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
                ID_PRIVILEGIO: "0",
                DESCRIPCION: ''
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
        getPrivilegio();
      })
  }

  
  const handleEditClick = (id: GridRowId) => () => {
    let itemSelected = lPrivilegio.find(item => item.ID_PRIVILEGIO.toString() === id.toString());

    setFormValues({
      ...formValues,
      "ID_PRIVILEGIO": itemSelected?.ID_PRIVILEGIO || "0",
      "DESCRIPCION": itemSelected?.DESCRIPCION || ""
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
          fetch(`${URL_API}/privilegio/delete`, {
            method: "POST",
            headers: {
              "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
              "ID_PRIVILEGIO": id
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
              getPrivilegio();
            })
        }
      })
  };

  
  const gRows = () => {
    let result: { id: number, number: number, descripcion: string, estado: string, state: string }[] = [];
    lPrivilegio && lPrivilegio.forEach((item, index) => {
      result.push({
        id: parseInt(item.ID_PRIVILEGIO),
        number: index + 1,
        descripcion: item.DESCRIPCION || "-",
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
    getPrivilegio()
  }, []);




  return (
    <Grid container spacing={2} justifyContent={"center"} id='crudAll'>
      <Grid xs={4} className='container-duplex'>
        <form onSubmit={(e) => { e.preventDefault(); SaveChanged(); }}>
          <FormControl fullWidth>
            <TextField
              required
              name="DESCRIPCION"
              label="Nombre del Privilegio"
              placeholder=''
              autoComplete='off'
              inputProps={{ maxLength: 100 }}
              value={formValues.DESCRIPCION}
              onChange={handleChange}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ backgroundColor: "#D9A3FF", maxWidth: 250, fontWeight: "bold", margin: "auto" }}
              >
              {
                formValues.ID_PRIVILEGIO !== "0" ?
                  "Actualizar" : "Registrar"
              }
            </Button>
            <br />
            {
              formValues.ID_PRIVILEGIO !== "0" &&
              <Button
                type="button"
                variant="contained"
                color="warning"
                onClick={() => {
                  setFormValues({
                    ID_PRIVILEGIO: "0",
                    DESCRIPCION: ''
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
            { field: "descripcion", headerName: 'DESCRIPCION', minWidth: 200 },
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

export default CrearPrivilegio