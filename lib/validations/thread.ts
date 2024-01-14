//Defining the schema of our validation to be used in forms
import * as z from 'zod';
export const ThreadValidation = z.object({
    thread:z.string().min(3,{message:"Minimum 3 character"}).max(30),
    accountId:z.string(),
    
})

export const CommentValidation = z.object({
    thread:z.string().min(3,{message:"Minimum 3 character"}).max(30),
    
})
