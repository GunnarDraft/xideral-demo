'use client'

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Container, Flex, P, Title } from "@/styles/styles";
import { useRouter } from "next/navigation";
import { TextField, Switch, Button } from "@mui/material";
import { useMyContext } from "@/app/provider";
import { Employee, User } from "@/interfaces/types";

export default function EditarEmpleado({ params }: { params: { empleadoId: string } }) {

    const { employees, users, setEmployees, setUsers } = useMyContext();

    const empleado = employees.find(emp => emp.id === params.empleadoId)
    const usuario = users.find(emp => emp.id === params.empleadoId)

    const router = useRouter();

    const { handleSubmit, control } = useForm<Employee & User>({
        defaultValues: {
            id: empleado?.id,
            empName: empleado?.empName,
            empFirstName: empleado?.empFirstName,
            empLastName: empleado?.empLastName,
            empBirthDate: empleado?.empBirthDate,
            empSystemAccess: empleado?.empSystemAccess,
            usrName: usuario?.usrName,
            usrPassword: usuario?.usrPassword,
            usrAreas: usuario?.usrAreas,
        },
    })
    const onSubmit: SubmitHandler<Employee & User> = (data) => {

        const existingEmployeeIndex = employees.findIndex((employee) => employee.id === data.id);
        
        //sin validaciones de schema por falta de tiempo

        if (existingEmployeeIndex !== -1) {
            const updatedEmployees = [...employees];
            updatedEmployees[existingEmployeeIndex] = {
                ...updatedEmployees[existingEmployeeIndex],
                empName: data.empName,
                empFirstName: data.empFirstName,
                empLastName: data.empLastName,
                empBirthDate: data.empBirthDate,
                empSystemAccess: data.empSystemAccess,
            };
            setEmployees(updatedEmployees);

            const existingUserIndex = users.findIndex((user) => user.id === data.id);

            const updatedUsers = [...users];
            if (existingUserIndex !== -1) {
                updatedUsers[existingUserIndex] = {
                    ...updatedUsers[existingUserIndex],
                    usrName: data.usrName || '', 
                    usrEmail: data.usrEmail || '',
                    usrPassword: data.usrPassword || '', 
                };
            }  
            setUsers(updatedUsers);
        }
        console.log('back', existingEmployeeIndex)
        router.back();
    };
    return <main>
        <Title>
            Editar empleado
        </Title>
        {empleado && <Container >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                {empleado.empName === usuario?.usrName && (
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
                                render={({ field }) => <TextField fullWidth label="Correo" variant="outlined" {...field} />}
                                name="usrEmail"
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
                    </>
                )}
            </form>
            <Flex>
                <span style={{ flex: 1 }}>&nbsp;</span>
                <Button variant="contained" color='secondary' onClick={() => router.back()}>Cancelar</Button>
                <span>&nbsp;</span>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} >Guardar</Button>
            </Flex>
        </Container>}
    </main>

}

