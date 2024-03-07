'use client'

import { Area, User, Employee } from '@/interfaces/types';
import { createContext, useContext, useState } from 'react'

export const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProps {
    employees: Employee[];
    users: User[];
    areas: Area[];
    setEmployees: (value: Employee[]) => void;
    setUsers: (value: User[]) => void;
    setAreas: (value: Area[]) => void;
}

export default function Provider({ children, }: { children: React.ReactNode }) {
    const [areas, setAreas] = useState<Area[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);

    const contextValue: MyContextProps = {
        areas,
        users,
        employees,
        setEmployees,
        setUsers,
        setAreas
    };

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
}

export const useMyContext = () => {

    const context = useContext(MyContext);
    console.log('useMyContext', context)
    if (!context) {
        throw new Error('useMyContext debe ser utilizado dentro de un MyProvider');
    }
    return context;
};