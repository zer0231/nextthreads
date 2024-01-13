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
import { Textarea } from '../ui/textarea';
// import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';


interface Props {
    user: {
        id: string,
        objectId: string,
        userName: string,
        name: string,
        bio: string,
        image: string
    },
    btnTitle: string;
}


export default function PostThread({ userId }: { userId: string }) {
    // zod allows to validate schema with validation type

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    });
    const onSubmit = () => { }
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
                                <Textarea rows={15}
                                    className='account-form_input no-focus'
                                    placeholder="Enter a username"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
            </form>
        </Form>)
}
