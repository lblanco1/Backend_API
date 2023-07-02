import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../Services/UsersServices";

class UsersController {
    private usersServices: UsersServices
    constructor() {
        this.usersServices = new UsersServices()
    }
    index() {
        //Buscar todos
    }

    show() {
        //Buscar somente um
    }
    async store(request: Request, response: Response, next: NextFunction) {
        //Criar
        const { name, email, password } = request.body;
        console.log('chegou aqui')
        try {
            const result = await this.usersServices.create({ name, email, password })
            return response.status(201).json(result);

        } catch (error) {
            next(error)
        }
    }
    async auth(request: Request, response: Response, next: NextFunction) {
        //autenticação
        const { email, password } = request.body;
        try {
            const result = await this.usersServices.auth(email, password)
            return response.json(result)
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { name, oldPassword, newPassword } = request.body;
        const { user_id } = request
        try {

            const result = await this.usersServices.update({
                name,
                oldPassword,
                newPassword,
                avatar_url: request.file,
                user_id
            })
            return response.status(200).json(result);

        } catch (error) {
            next(error)
        }
    }
}

export { UsersController };