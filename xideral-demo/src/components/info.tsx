'use client'

import { useEffect, useState } from 'react';
import { useMyContext } from '@/app/provider'

import { redirect, useRouter } from 'next/navigation';
import { Button, Card, Checkbox, Dialog, Divider, IconButton } from '@mui/material';
import SchemaIcon from '@mui/icons-material/Schema';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { Container, Flex, P, Title } from '@/styles/styles'
import { Employee, User } from '@/interfaces/types';

export default function Info({ getEmployees, getUsers, params }: { getEmployees: Employee[], getUsers: User[], params: { empleadoId: string } }) {

    const { employees, users, setEmployees, setUsers } = useMyContext();

    useEffect(() => {
        setEmployees(getEmployees)
        setUsers(getUsers)
    }, [])

    const empleado = employees.find(emp => emp.id === params.empleadoId)
    const usuario = users.find(emp => emp.id === params.empleadoId)

    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const router = useRouter();

    return (<div>
        <Container style={{ width: 600, margin: 'auto' }}>
            <Title>
                Detalles del empleado
            </Title>
            <Flex>
            </Flex>
            <Flex><b>Nombre</b>&nbsp;<p>{empleado?.empName}</p> </Flex>
            <Flex><b>Apellido paterno</b>&nbsp;<p>{empleado?.empFirstName}</p> </Flex>
            <Flex><b>Apellido materno</b>&nbsp;<p>{empleado?.empLastName}</p> </Flex>
            <Flex><b>Fecha de nacimiento</b>&nbsp;<p>{empleado?.empBirthDate}</p> </Flex>
            <Flex><b>Nombre de usuario</b>&nbsp;<p>{empleado?.empName}</p> </Flex>
            <Flex><b>¿Acceso al sistema?</b>&nbsp;<p>{empleado?.empSystemAccess ? 'Si' : 'No'}</p> </Flex>
            <Card variant="outlined" >
                <Flex>
                    <IconButton
                        color="secondary" aria-label="Modal"
                        onClick={handleClickOpen}
                    >
                        <SchemaIcon />
                    </IconButton>
                    <span style={{ flex: 1 }} />
                    <IconButton
                        color="secondary" aria-label="Editar"
                        onClick={() => { params ? redirect(`/editar-empleado/${params.empleadoId}`) : redirect('/empleados') }}
                    >
                        <EditIcon />
                    </IconButton>
                </Flex>
                <Divider />
                <P><b>Usuario</b></P>

                <Flex> <b>Nombre de usuario </b>&nbsp;<p>{usuario?.usrName}</p> </Flex>
                <Flex> <b>Correo </b>&nbsp;<p>{usuario?.usrEmail}</p> </Flex>
                <Flex> <b>Areas </b>&nbsp;<p>{usuario?.usrAreas.map((area: any) => `Area ${area} `)}</p> </Flex>
            </Card>
            <br />
            <Button variant="contained" color='warning' onClick={() => router.back()}>Regresar</Button>
        </Container>
        <Dialog onClose={handleClose} open={open}>
            <Title>Áreas Asociadas <IconButton onClick={handleClose}><CloseIcon /></IconButton></Title>
            {/* controlar valores */}
            <Container>
                <Flex><P>Area 1</P> <Checkbox value={true}></Checkbox></Flex>
                <Flex><P>Area 2</P> <Checkbox value={true}></Checkbox></Flex>
                <Flex><P>Area 3</P> <Checkbox value={true}></Checkbox></Flex>
                <Flex><P>Area 4</P> <Checkbox value={true}></Checkbox></Flex>
            </Container>
            <Flex>
                <span style={{ flex: 1 }}>&nbsp;</span>
                <Button variant="contained" color='secondary' onClick={() => handleClose()}>Cancelar</Button>
                <span>&nbsp;</span>
                <Button variant="contained" color="primary"  >Guardar</Button>
            </Flex>
        </Dialog>
    </div>);
}