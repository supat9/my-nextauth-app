import { PrismaClient } from '@prisma/client';
import bcryt from 'bcrypt';
const prisma = new PrismaClient();
export async function POST(request) {
    try{
        const {name, email, password} = await request.json()
        const hashPassword = await bcryt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })
        return Response.json({
            message: 'USER Create success',
            data: {newUser}
        });
        }catch (error){
            return Response.json({error: error.message});
        }
}