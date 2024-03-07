export async function getEmployees() {
    const res = await fetch('http://localhost:3000/employees')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getUsers() {
    const res = await fetch('http://localhost:3000/users')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getAreas() {
    const res = await fetch('http://localhost:3000/areas')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}