"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
// import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';
import { CommentValidation } from '@/lib/validations/thread';


interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
            accountId: currentUserId,
        }
    });
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {//Executes the function when post thread button is pressed
        // await createThread({
        //     text: values.thread,
        //     author: currentUserId, communityId: null, path: pathname
        // });
        // router.push("/");  //redirect to home page
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-start gap-10'>
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1' >
                                <Input 
                                    className='account-form_input no-focus'
                                    placeholder="Start comment :)"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                <Button className='bg-primary-500' type="submit">Comment</Button>
            </form>
        </Form>)
}
export default Comment;