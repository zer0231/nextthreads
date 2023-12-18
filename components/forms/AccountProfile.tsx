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
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Textarea } from '../ui/textarea';
interface Props {
    userData: {
        id: String,
        objectId: String,
        userName: String,
        name: String,
        bio: String,
        image: String
    },
    btnTitle: String;
}

// zod allows to validate schema with validation type
export default function AccountProfile({ userData, btnTitle }: Props) {
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: "",
            name: "",
            user_name: "",
            bio: ""
        }
    });

    const handleImage = (e: ChangeEvent, fieldChange: (value: String) => void) => {
        e.preventDefault() //Prevents from browser reload
    }

    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                {/* Take user profile photo field */}
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form_image-label'>
                                {
                                    field.value ? (<Image src={field.value} alt='profile photo' width={96} height={96} priority className='rounded-full object-contain' />) :
                                        (<Image src="/assets/profile.svg" alt='profile photo' width={24} height={24} className='object-contain' />)
                                }
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input placeholder="Upload a photo"
                                    type='file'
                                    className='account-form_image-input'
                                    accept='image/*'
                                    onChange={(e) => handleImage(e, field.onChange)} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Name filed  */}

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Name
                            </FormLabel>
                            <FormControl >
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    placeholder="Enter your full name"
                                    {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* User name filed */}
                <FormField
                    control={form.control}
                    name="user_name"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Username
                            </FormLabel>
                            <FormControl >
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    placeholder="Enter a username"
                                    {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Bio field */}
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Bio
                            </FormLabel>
                            <FormControl >
                                <Textarea
                                    rows={10}
                                    className='account-form_input no-focus'
                                    placeholder="Enter a bio"
                                    {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className='bg-primary-500' type="submit">Submit</Button>
            </form>
        </Form>
    )
}
