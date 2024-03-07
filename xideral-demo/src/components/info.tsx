'use client'

import { useEffect, useState } from 'react';
import { useMyContext } from '@/app/provider'

import { redirect, useRouter } from 'next/navigation';
import { Button, Card, Checkbox, Dialog, Divider, FormControlLabel, IconButton } from '@mui/material';
import SchemaIcon from '@mui/icons-material/Schema';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { Container, Flex, P, Title } from '@/styles/styles'
import { Employee, User } from '@/interfaces/types';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';

export default function Info({ getEmployees, getUsers, params }: { getEmployees: Employee[], getUsers: User[], params: { empleadoId: string } }) {

    const { employees, users, setEmployees, setUsers } = useMyContext();

    useEffect(() => {
        if (employees.length === 0) { setEmployees(getEmployees) }
        if (users.length === 0) { setUsers(getUsers) }
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

    const { control, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        //valores de los checkbox sin controlar 
        console.log('Valores seleccionados:', data);
    };
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
                    <Link href={`/editar-empleado/${empleado?.id}`}>
                        <IconButton
                            color="secondary" aria-label="Editar"
                        >
                            <EditIcon />
                        </IconButton>
                    </Link>
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    {usuario?.usrAreas.map((option, index) => (
                        <div key={index}>
                            <Controller
                                name={`${index}`}
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (

                                    <FormControlLabel
                                        control={<Checkbox {...field} />}
                                        label={`Area ${option}`}
                                    />
                                )}
                            />
                        </div>
                    ))}
                </Container>
            </form>
            <Flex>
                <span style={{ flex: 1 }}>&nbsp;</span>
                <Button variant="contained" color='secondary' onClick={() => handleClose()}>Cancelar</Button>
                <span>&nbsp;</span>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Guardar</Button>
            </Flex>
        </Dialog>
    </div>);
}