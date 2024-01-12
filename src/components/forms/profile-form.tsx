"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { User } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ProfileSchema, TProfileSchema } from "@/schema/profile-schema";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { UploadButton } from "@/lib/uploadthing";

const ProfileForm = ({ profile }: { profile: User }) => {
  const form = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      username: profile?.username || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      job: profile?.job || "",
      image: profile?.image || "",
      website: profile?.website || "",
    },
  });

  const router = useRouter();

  const updateProfile = async (values: TProfileSchema) => {
    try {
      const { data } = await axios.patch(`/api/users/${profile.id}`, values);
      return data;
    } catch (error) {
      return error;
    }
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Updated your profile!");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to updated your profile!");
    },
  });

  const onSubmit = async (values: TProfileSchema) => {
    mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-clip">
                <Image
                  src={field.value || ""}
                  alt="user-img"
                  fill
                  className="object-cover"
                />
              </div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => field.onChange(res[0].url)}
              />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="job"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="website"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="text-white font-semibold">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
