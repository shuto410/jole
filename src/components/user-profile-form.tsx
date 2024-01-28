'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Textarea } from './ui/textarea';
import { firestore } from '@/lib/firebaseConfig';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from '@/components/ui/use-toast';
import { doc, setDoc } from 'firebase/firestore';
import { PublicUserProfile } from '@/lib/types';

export function UserProfileForm({
  defaultValues,
  submitButtonText,
  userId,
  onSuccess,
}: UserProfileFormProps) {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'User name must be at least 2 characters.' })
      .max(20),
    age: z.coerce.number().positive().int().min(18).max(200),
    selfIntroduction: z.string().max(500).optional(),
    language: z.enum(['Japanese', 'English'], {
      required_error: 'You need to select a language you can talk fluently',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: '',
      selfIntroduction: '',
    },
  });

  const sendUserProfile = async (
    userProfile: PublicUserProfile,
    userId: string,
  ) => {
    try {
      // const docRef = await addDoc(collection(firestore, 'users'), user);
      await setDoc(doc(firestore, 'users', userId), userProfile);
      console.log('Document written');
      onSuccess?.();
      toast({
        title: 'You submitted the profile.',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
      toast({
        variant: 'destructive',
        title: 'Failed to submit.',
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('onSubmit');
    console.log(values);
    if (userId === undefined) {
      toast({
        variant: 'destructive',
        title: 'Failed to submit.',
      });
      console.error('No logged in information');
      return;
    }
    const userProfile: PublicUserProfile = {
      ...values,
      imageUrl: `https://picsum.photos/seed/${values.name}/200/200`,
      keywords: [],
      targetLanguage: values.language === 'Japanese' ? 'English' : 'Japanese',
    };
    await sendUserProfile(userProfile, userId);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder='20' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select your native language' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Japanese'>Japanese</SelectItem>
                  <SelectItem value='English'>English</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='selfIntroduction'
          render={({ field }) => (
            <FormItem>
              <FormLabel>About me</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a bit about yourself. Include your interests, hobbies, or anything you think we should know. '
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}

export type UserProfileFormProps = {
  submitButtonText: string;
  userId: string;
  defaultValues?: PublicUserProfile;
  onSuccess?: () => void;
};
