import { UserTypeEnum, useAppState } from "@/Structs/State";
import { NavBar } from "@/components/NavBar";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export function SigninForm({ className }: { className?: string }): JSX.Element {
  const { AppState, SetAppState } = useAppState();

  const SigninFormSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(30, {
        message: "A username cannot be longer than 30 characters long",
      }),
    password: z.string().min(3).max(127),
  });

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SigninFormSchema>) {
    console.log(values);
    SetAppState({ ...AppState, userType: UserTypeEnum.User });
  }

  return (
    <>
      <div className={className}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="nd6k" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your account username as it is shown to the public,
                    and the name that will be used to sign into your account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="superSecretPassword"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the password that you will use to prove that you
                    are... you. keep this a secret and not something that others
                    could easily guess.
                    <br />
                    <span className="font-semibold text-lg">
                      That means no: Password1!
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">SUBMIT</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default function SigninPage(): JSX.Element {
  const navigate = useNavigate();
  // if the user is signed in, redirect them to the home page as they cannot signin again

  return (
    <>
      <Helmet>
        <title>Signin Page</title>
      </Helmet>

      <NavBar />
      <h1 className="h-auto text-8xl font-bold mb-2 mt-4 break-words">
        Signin Page
      </h1>

      <div className="w-full flex flex-col items-center justify-center">
        <SigninForm className="w-full sm:w-1/2 p-2" />
        <Button
          variant={"secondary"}
          onClick={() => {
            navigate("/Signup");
          }}
        >
          Signup Instead?
        </Button>
      </div>
    </>
  );
}
