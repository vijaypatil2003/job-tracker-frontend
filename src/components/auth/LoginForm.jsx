import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../../api/auth.api";
import { FormField, TextInput } from "./FormField";
import SubmitButton from "./SubmitButton";
import ErrorAlert from "./ErrorAlert";

export default function LoginForm({ navigate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Invalid email or password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && <ErrorAlert message={serverError} />}

      <FormField label="Email address" error={errors.email}>
        <TextInput
          id="login-email"
          type="email"
          autoComplete="email"
          autoFocus
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

      <FormField
        label="Password"
        error={errors.password}
        labelRight={
          <a
            href="/forgot-password"
            className="text-xs text-[#64748B] hover:text-[#26A9C9] transition-colors"
          >
            Forgot password?
          </a>
        }
      >
        <TextInput
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          hasError={!!errors.password}
          {...register("password", {
            required: "Password is required.",
            minLength: { value: 6, message: "At least 6 characters." },
          })}
        />
      </FormField>

      {/* Remember me */}
      <div className="flex items-center gap-2.5">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 rounded border-[#CBD5E1] text-[#26A9C9] accent-[#26A9C9] cursor-pointer"
        />
        <label
          htmlFor="remember"
          className="text-[13px] text-[#475569] cursor-pointer select-none"
        >
          Remember me for 30 days
        </label>
      </div>

      <SubmitButton
        isLoading={isLoading}
        label="Sign in"
        loadingLabel="Signing in…"
      />
    </form>
  );
}
