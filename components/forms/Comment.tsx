"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import Image from 'next/image';


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
            <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex items-center w-full gap-3'>
                            <FormLabel>
                             <Image
                             alt='profile-image'
                             className='rounded-full object-cover'
                             width={48}
                             height={48}
                             src={currentUserImg}
                             />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent' >
                                <Input 
                                    className='text-light-1 outline-none no-focus'
                                    placeholder="Start comment :)"
                                    {...field} />
                            </FormControl>
                       
                        </FormItem>)} />
                <Button className='comment-form_btn bg-primary-500' type="submit">Reply</Button>
            </form>
        </Form>)
}
export default Comment;