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
import { ChangeEvent, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthings';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';


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

// zod allows to validate schema with validation type
export default function AccountProfile({ user, btnTitle }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media")
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            user_name: user?.userName || "",
            bio: user?.bio || ""
        }
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: String) => void) => {
        e.preventDefault() //Prevents from browser reload
        const fileReader = new FileReader()
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files)); //Setting state to file array
            if (!file.type.includes('image')) {
                return;
            } else {
                fileReader.onload = async (event) => {
                    const imageDataUrl = event.target?.result?.toString() || "";
                    fieldChange(imageDataUrl);
                }
                fileReader.readAsDataURL(file);
            }

        }
    }

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const blob = values.profile_photo; //contains the values submitted
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imageRes = await startUpload(files)

            if (imageRes && imageRes[0].url) {
                values.profile_photo = imageRes[0].url;
            }
        }

        await updateUser({
            userId: user.id, //Comming from clerk
            username: values.user_name,
            name: values.name,
            bio: values.bio,
            image: values.profile_photo,
            path: pathname,
        });

        if (pathname === '/profile/edit') {
            router.back();
        } else {
            router.push('/');
        }

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
                            <FormMessage />
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
                            </FormControl>              <FormMessage />
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
                            </FormControl>              <FormMessage />
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
                            </FormControl>              <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='bg-primary-500' type="submit">Submit</Button>
            </form>
        </Form>
    )
}
