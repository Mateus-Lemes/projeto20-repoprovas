import prisma from "../config/db.js"

export interface SignUp {
    email: string,
    password: string,
    passwordConfirmed: string
}

export type User = Omit<SignUp, "passwordConfirmed">

export async function findByEmail(email: string) {
    const user = await prisma.users.findFirst({
        where: {
            email
        }})
    return user;
}

export async function createUser(user: User) {
    await prisma.users.create({
        data: user
    })
}

export async function findById(id:number) {
    const user = await prisma.users.findFirst({
        where: {
            id
        }
    })
    return user;
}