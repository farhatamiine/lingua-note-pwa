import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInformSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";

function SigninPage() {
  const navigate = useNavigate();
  const { signInUser } = UserAuth();
  const form = useForm<z.infer<typeof SignInformSchema>>({
    resolver: zodResolver(SignInformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      return await signInUser(values.email, values.password);
    },
    onSuccess: (response) => {
      if (response.success) {
        navigate("/");
      } else {
        console.error("Login failed:", response.error?.message);
      }
    },
    onError: (err) => {
      console.error("Unexpected error:", err);
    },
  });

  function onSubmit(values: z.infer<typeof SignInformSchema>) {
    mutation.mutate(values);
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4  p-6 rounded-xl"
        >
          <h2 className="font-bold text-xl text-center mb-2">Sign in</h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    className="h-12 px-4 text-base"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    className="h-12 px-4 text-base"
                    placeholder="your password"
                    autoComplete="current-password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 bg-black text-white rounded-md py-3 text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
          >
            Submit
          </Button>
          <p className="text-center text-sm">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="font-bold text-black underline">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default SigninPage;
