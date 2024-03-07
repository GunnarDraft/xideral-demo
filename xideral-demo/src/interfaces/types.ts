
export interface Employee {
    id: string;
    empName: string;
    empFirstName: string;
    empLastName: string;
    empBirthDate: string;
    empSystemAccess: boolean;
}

export interface User {
    id: string;
    employeeId: string;
    usrEmail: string;
    usrName: string;
    usrPassword: string;
    usrAreas: string[];
}

export interface Area {
    id: string;
    joaName: string;
    joaAbbreviation: string;
}

export interface Data {
    employees: Employee[];
    users: User[];
    areas: Area[];
}