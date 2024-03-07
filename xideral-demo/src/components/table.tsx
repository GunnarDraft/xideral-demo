'use client'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { Employee } from '../interfaces/types';
import { Title } from '@/styles/styles'
import { useEffect } from 'react';
import { useMyContext } from '../app/provider'

export default function Table({ getEmployees }: { getEmployees: Employee[] }) {

    const router = useRouter();
    const { setEmployees, employees } = useMyContext();

    useEffect(() => {
        if (employees.length === 0) {
            setEmployees(getEmployees)
        }
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'empName',
            headerName: 'Nombre',
            flex: 1
        },
        {
            field: 'empFirstName',
            headerName: 'Apellido Paterno',
            flex: 1,
            editable: true,
        },
        {
            field: 'empLastName',
            headerName: 'Apellido Materno',
            flex: 1,
            editable: true,
        },
        {
            field: 'empBirthDate',
            headerName: 'Fecha de nacimiento',
            flex: 1,
            editable: true,
        },
        {
            field: 'ver',
            headerName: 'Ver',
            width: 100,
            renderCell: (params) => (
                <IconButton
                    color="secondary" aria-label="Ver"
                    onClick={() => router.push(`empleados/${params.id}`)}
                >
                    <VisibilityIcon />
                </IconButton>
            ),
        },
        {
            field: 'edit',
            headerName: 'Editar',
            width: 100,
            renderCell: (params) => (
                <IconButton
                    color="secondary" aria-label="Editar"
                    onClick={() => { router.push(`editar-empleado/${params.id}`) }}
                >
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <main >
            <Title>
                Empleados
            </Title>
            <Button
                style={{ marginLeft: 'auto' }}
                variant="contained"
                color="primary"
                onClick={() => router.push('agregar-empleado')}
            >
                Agregar
            </Button>
            <Box sx={{ height: 400, width: '100%' }}>
                {employees &&
                    <DataGrid
                        rows={employees}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        rowSelection={false}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5]}
                    />
                }
            </Box>
        </main>
    );
}

