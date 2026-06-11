import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "../../api/auth.api";
import { FormField, TextInput } from "./FormField";
import SubmitButton from "./SubmitButton";
import ErrorAlert from "./ErrorAlert";

export default function SignupForm({ navigate }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      const response = await registerUser(data);
      localStorage.setItem("token", response.token);
      navigate("/complete-profile");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && <ErrorAlert message={serverError} />}

      <FormField label="Full name" error={errors.name}>
        <TextInput
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          hasError={!!errors.name}
          {...register("name", { required: "Name is required." })}
        />
      </FormField>

      <FormField label="Email address" error={errors.email}>
        <TextInput
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          hasError={!!errors.email}
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address.",
            },
          })}
        />
      </FormField>

      <FormField label="Password" error={errors.password}>
        <TextInput
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="Min. 8 characters"
          hasError={!!errors.password}
          {...register("password", {
            required: "Password is required.",
            minLength: { value: 8, message: "At least 8 characters." },
          })}
        />
      </FormField>

      <FormField label="Confirm password" error={errors.confirm}>
        <TextInput
          id="signup-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          hasError={!!errors.confirm}
          {...register("confirm", {
            required: "Please confirm your password.",
            validate: (val) =>
              val === watch("password") || "Passwords don't match.",
          })}
        />
      </FormField>

      <SubmitButton
        isLoading={isLoading}
        label="Create account"
        loadingLabel="Creating account…"
      />

      <p className="text-center text-xs text-[#94A3B8] leading-relaxed pt-1">
        By signing up, you agree to our{" "}
        <a
          href="/terms"
          className="text-[#64748B] hover:text-[#26A9C9] underline underline-offset-2 transition-colors"
        >
          Terms
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="text-[#64748B] hover:text-[#26A9C9] underline underline-offset-2 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
