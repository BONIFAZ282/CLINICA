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

function PruebaConsulta() {

    const [formValues, setFormValues] = useState({
        ID_CONSULTA: "0",
        OBSERVACION: "",
        FECHA: "",
        ID_TRABAJADOR: "",
        ID_CLIENTE: "",
        ID_PROCEDIMIENTO: "",
        ID_TIPO_PAGO: ""
    });

    const [lConsulta, setLConsulta] = useState<iLConsulta[]>([]);



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
    getConsulta();
  }, []);





  return (
    <Grid container spacing={2} justifyContent={"center"} id='crudAll'>
      <Grid xs={12}>
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

export default PruebaConsulta