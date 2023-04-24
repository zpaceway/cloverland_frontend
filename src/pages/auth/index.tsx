import { z } from "zod";
import Button from "../../components/shared/Button";
import TextField from "../../components/shared/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "../../lib/axios";
import { useAtom } from "jotai";
import { pageWrapperDataAtom } from "../../atoms";
import { useEffect } from "react";

const authFormSchema = z.object({
  email: z.string().email("Please, input a valid email."),
});

type AuthFormSchemaType = z.infer<typeof authFormSchema>;

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormSchemaType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const [, setPageWrapperData] = useAtom(pageWrapperDataAtom);

  const onSubmit: SubmitHandler<AuthFormSchemaType> = async ({ email }) => {
    await axios
      .post("/api/auth/", {
        email,
      })
      .then(() =>
        toast.success("An magik link was sent to your email address.")
      )
      .catch(() =>
        toast.error("Something went wrong, please try again later.")
      );
  };

  useEffect(() => {
    setPageWrapperData({
      title: "Magic Link Authentication",
      header: "Auth",
    });
  }, [setPageWrapperData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xs flex-col gap-4"
    >
      <div>
        Please, enter your email down bellow and we will send you a magic link
        to sign in.
      </div>
      <TextField
        type="email"
        errorMessage={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" loading={isSubmitting}>
        Send
      </Button>
    </form>
  );
};

export default AuthPage;
