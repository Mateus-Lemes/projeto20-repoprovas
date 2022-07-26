import { createUser, findByEmail, findById, SignUp, User } from "../Repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUpService(body: SignUp) {
    const { email, password } = body;

    const user = await findByEmail(email);
    if(user) {
        throw {
            type: "conflict",
            message: "Este email já está em uso, escolha outro"
        }
    }

    await createUser({
        email, 
        password: bcrypt.hashSync(password, 10)
    });
}

export async function signInService(body: User) {
    const { email, password } = body;

    const user = await findByEmail(email);
    if(!user) {
        throw {
            type: "not found",
            message: "Não existe usuário com este email"
        }
    }

    if(!bcrypt.compareSync(password, user.password)) {
        throw {
            type: "unauthorized",
            message: "senha inserida não confere com usuário"
        }
    }

    const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY)

    return token
}

export async function findByUserId(id:number) {
    const user = await findById(id);
    if(!user) {
        throw {
            type: "Not Found",
            message: "No user was found"
        }
    }
    return user
}