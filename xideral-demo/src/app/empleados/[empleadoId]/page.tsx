import { getEmployees, getUsers } from '@/lib/api';
import Info from '@/components/info';

export default async function Empleado({ params }: { params: { empleadoId: string } }) {
    const employees = await getEmployees()
    const users = await getUsers()
    return (
        <main>
            <Info getEmployees={employees} getUsers={users} params={params} />
        </main>
    );
}

