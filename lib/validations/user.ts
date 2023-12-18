//Defining the schema of our validation to be used in forms
import * as z from 'zod';
export const UserValidation = z.object({
    profile_photo: z.string().url().min(1),
    name:z.string().min(3,{message:"Minimum 3 character"}).max(30),
    user_name:z.string().min(3,{message:"Minimum 3 character"}).max(30),
    bio:z.string().min(3,{message:"Minimum 3 character"}).max(1000),
    
})