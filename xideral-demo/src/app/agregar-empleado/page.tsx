'use client'

import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Container, Flex, P, Title } from "@/styles/styles";
import { TextField, Switch, Button } from "@mui/material";
import { useMyContext } from "../provider";
import { Employee, User } from "@/interfaces/types";

export default function AgregarEmpleado() {

    const router = useRouter();
    const { employees, setEmployees, setUsers, users } = useMyContext();

    const { handleSubmit, control, reset } = useForm<Employee & User>({
        defaultValues: {
            empName: '',
            empFirstName: '',
            empLastName: '',
            empBirthDate: '',
            empSystemAccess: false,
            usrName: '',
            usrPassword: '',
            usrAreas: [''],
        },
    })

    const onSubmit: SubmitHandler<Employee & User> = (data) => {
        //delete log
        console.log(data)
        
        setEmployees([...employees, {
            id: (employees.length + 1).toString(),
            empName: data.empName,
            empFirstName: data.empFirstName,
            empLastName: data.empLastName,
            empBirthDate: data.empBirthDate,
            empSystemAccess: data.empSystemAccess
        }]) 
        //implementar validacion de usuario
        if (users) {   
            setUsers([...users, {
                id: (users.length + 1).toString(),
                employeeId: data?.employeeId,
                usrName: data?.usrName,
                usrEmail: data?.usrEmail,
                usrPassword: data?.usrPassword,
                usrAreas: data?.usrAreas
            }])
        }
        router.back()
    }

    return (
        <main>
            <Title>
                Agregar empleado
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container >
                    <Flex>
                        <Controller
                            render={({ field }) => <TextField fullWidth label="Nombre" variant="outlined" {...field} />}
                            name="empName"
                            control={control}
                        />
                    </Flex>
                    <Flex>
                        <Controller
                            render={({ field }) => <TextField fullWidth label="Apellido paterno" variant="outlined" {...field} />}
                            name="empFirstName"
                            control={control}
                        />
                    </Flex>
                    <Flex>
                        <Controller
                            render={({ field }) => <TextField fullWidth label="Apellido materno" variant="outlined" {...field} />}
                            name="empLastName"
                            control={control}
                        />
                    </Flex>
                    <Flex>
                        <Controller
                            render={({ field }) => <TextField fullWidth label="Fecha de nacimiento" variant="outlined" {...field} />}
                            name="empBirthDate"
                            control={control}
                        />
                    </Flex>
                    <Flex>
                        <P>
                            ¿Acceso al sistema?
                        </P>
                        <span style={{ flex: 1 }}></span>
                        <P>No</P>
                        <Controller
                            render={({ field }) => <Switch {...field} />}
                            name="empSystemAccess"
                            control={control}
                        />
                        <P>Si</P>
                    </Flex>
                    {users && (
                        <>
                            <Flex>
                                <Controller
                                    render={({ field }) => <TextField fullWidth label="Nombre de usuario" variant="outlined" {...field} />}
                                    name="usrName"
                                    control={control} 
                                />
                            </Flex>
                            <Flex>
                                <Controller
                                    render={({ field }) => <TextField fullWidth label="Contraseña" type="password" variant="outlined" {...field} />}
                                    name="usrPassword"
                                    control={control}
                                />
                            </Flex>
                            <Flex>
                                <Controller
                                    render={({ field }) => <TextField fullWidth label="Areas" variant="outlined" {...field} />}
                                    name="usrAreas"
                                    control={control}
                                />
                            </Flex>
                        </>
                    )}
                </Container>
            </form>
            <Flex>
                <span style={{ flex: 1 }}>&nbsp;</span>
                <Button variant="contained" color='secondary' onClick={() => router.back()}>Cancelar</Button>
                <span>&nbsp;</span>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} >Guardar</Button>
            </Flex>
        </main>
    );
}


