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

export function SignupForm({ className }: { className?: string }): JSX.Element {
  const { AppState, SetAppState } = useAppState();

  const SignupFormSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(30, {
          message: "A username cannot be longer than 30 characters long",
        }),
      email: z.string().email(),
      password: z
        .string()
        .min(6, {
          message:
            "passwords shorter than 6 characters (even those using numbers & special characters) can be cracked in less than 20 minutes (acording to security.org)",
        })
        .max(127),
      confirm_password: z.string().min(3).max(127),
    })
    .refine((data) => data.confirm_password === data.password, {
      message: "Password and Confirm Password Boxes are not the same",
      path: ["confirm_password"],
    });

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
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
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="superSecretPassword"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is where you type your password again to make sure that
                    you didnt accidentally have a typo in your password and not
                    be able to signin again later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tungsten.cube@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the email that will (not) be used to contact you for
                    varias reasons. (in theory this would be used to recover
                    your account but that has not been implemented)
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

export default function SignupPage(): JSX.Element {
  const navigate = useNavigate();
  // if the user is signed in, redirect them to the home page as they cannot signin again

  return (
    <>
      <Helmet>
        <title>Signup Page</title>
      </Helmet>

      <NavBar />
      <h1 className="h-auto text-8xl font-bold mb-2 mt-4 break-words">
        Signup Page
      </h1>

      <div className="w-full flex flex-col items-center justify-center">
        <SignupForm className="w-full sm:w-1/2 p-2" />
        <Button
          variant={"secondary"}
          onClick={() => {
            navigate("/Signin");
          }}
        >
          Signin Instead?
        </Button>
      </div>
    </>
  );
}
