import { z } from "zod";
import TopBar from "../../components/TopBar";
import Button from "../../components/shared/Button";
import TextField from "../../components/shared/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "../../lib/axios";

const authFormSchema = z.object({
  email: z.string().email("Please, input a valid email."),
});

type AuthFormSchemaType = z.infer<typeof authFormSchema>;

const Auth = () => {
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

  const onSubmit: SubmitHandler<AuthFormSchemaType> = async ({ email }) => {
    await axios
      .post("/api/auth", {
        email,
      })
      .then(() =>
        toast.success("An magik link was sent to your email address.")
      )
      .catch(() =>
        toast.error("Something went wrong, please try again later.")
      );
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      <TopBar subtitle="Auth" />
      <div className="grid h-full w-full place-items-center overflow-y-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-xs flex-col gap-4"
        >
          <div>
            Please, enter your email down bellow and we will send you a magic
            link to login.
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
      </div>
    </div>
  );
};

export default Auth;
