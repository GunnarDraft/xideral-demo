import { getAreas, getEmployees, getUsers } from '@/lib/api';

import Table from '../../components/table';

export default async function Empleados() {

    const employees = await getEmployees() 

    return (
        <Table getEmployees={employees} />
    );
}

