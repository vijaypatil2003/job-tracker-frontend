// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { loginUser, registerUser } from "../../api/auth.api";

// // export default function AuthPage() {
// export default function LoginPage() {

//   const [tab, setTab] = useState("login");
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-10">
//       {/* Background texture blobs */}
//       <div
//         className="pointer-events-none fixed inset-0 overflow-hidden"
//         aria-hidden="true"
//       >
//         <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-3xl" />
//         <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-500/15 blur-3xl" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-800/10 blur-2xl" />
//       </div>

//       {/* Glass card */}
//       <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40 p-8">
//         {/* Logo */}
//         <div className="flex items-center gap-2.5 mb-8">
//           <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center">
//             <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
//               <rect x="4" y="4" width="10" height="10" rx="2" fill="#a78bfa" />
//               <rect
//                 x="18"
//                 y="4"
//                 width="10"
//                 height="10"
//                 rx="2"
//                 fill="#a78bfa"
//                 fillOpacity="0.5"
//               />
//               <rect
//                 x="4"
//                 y="18"
//                 width="10"
//                 height="10"
//                 rx="2"
//                 fill="#a78bfa"
//                 fillOpacity="0.5"
//               />
//               <rect
//                 x="18"
//                 y="18"
//                 width="10"
//                 height="10"
//                 rx="2"
//                 fill="#a78bfa"
//                 fillOpacity="0.25"
//               />
//             </svg>
//           </div>
//           <span className="text-white font-semibold tracking-tight">Acme</span>
//         </div>

//         {/* Toggle tabs */}
//         <div className="relative flex bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
//           {/* Sliding pill */}
//           <div
//             className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white/10 border border-white/15 transition-transform duration-300 ease-out ${
//               tab === "signup"
//                 ? "translate-x-[calc(100%+8px)]"
//                 : "translate-x-0"
//             }`}
//           />
//           <button
//             onClick={() => setTab("login")}
//             className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//               tab === "login"
//                 ? "text-white"
//                 : "text-white/40 hover:text-white/70"
//             }`}
//           >
//             Sign in
//           </button>
//           <button
//             onClick={() => setTab("signup")}
//             className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//               tab === "signup"
//                 ? "text-white"
//                 : "text-white/40 hover:text-white/70"
//             }`}
//           >
//             Create account
//           </button>
//         </div>

//         {/* Forms */}
//         <div className="overflow-hidden">
//           <div
//             className="flex transition-transform duration-300 ease-out"
//             style={{
//               transform:
//                 tab === "signup" ? "translateX(-100%)" : "translateX(0%)",
//             }}
//           >
//             {/* Login form */}
//             <div className="w-full shrink-0">
//               <LoginForm navigate={navigate} />
//             </div>
//             {/* Signup form */}
//             <div className="w-full shrink-0">
//               <SignupForm navigate={navigate} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function LoginForm({ navigate }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState("");

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     setServerError("");
//     try {
//       const response = await loginUser(data);
//       localStorage.setItem("token", response.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setServerError(
//         err?.response?.data?.message || "Invalid email or password.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
//       {serverError && <ErrorAlert message={serverError} />}

//       <Field label="Email address" error={errors.email}>
//         <GlassInput
//           id="login-email"
//           type="email"
//           autoComplete="email"
//           placeholder="you@company.com"
//           hasError={!!errors.email}
//           {...register("email", {
//             required: "Email is required.",
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "Enter a valid email.",
//             },
//           })}
//         />
//       </Field>

//       <Field
//         label="Password"
//         error={errors.password}
//         labelRight={
//           <a
//             href="/forgot-password"
//             className="text-xs text-white/40 hover:text-white/70 transition-colors"
//           >
//             Forgot password?
//           </a>
//         }
//       >
//         <GlassInput
//           id="login-password"
//           type="password"
//           autoComplete="current-password"
//           placeholder="••••••••"
//           hasError={!!errors.password}
//           {...register("password", {
//             required: "Password is required.",
//             minLength: { value: 6, message: "At least 6 characters." },
//           })}
//         />
//       </Field>

//       <SubmitButton
//         isLoading={isLoading}
//         label="Sign in"
//         loadingLabel="Signing in…"
//       />
//     </form>
//   );
// }

// function SignupForm({ navigate }) {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState("");

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     setServerError("");
//     try {
//       const response = await registerUser(data);
//       localStorage.setItem("token", response.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setServerError(err?.response?.data?.message || "Something went wrong.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
//       {serverError && <ErrorAlert message={serverError} />}

//       <Field label="Full name" error={errors.name}>
//         <GlassInput
//           id="signup-name"
//           type="text"
//           autoComplete="name"
//           placeholder="Jane Smith"
//           hasError={!!errors.name}
//           {...register("name", { required: "Name is required." })}
//         />
//       </Field>

//       <Field label="Email address" error={errors.email}>
//         <GlassInput
//           id="signup-email"
//           type="email"
//           autoComplete="email"
//           placeholder="you@company.com"
//           hasError={!!errors.email}
//           {...register("email", {
//             required: "Email is required.",
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "Enter a valid email.",
//             },
//           })}
//         />
//       </Field>

//       <Field label="Password" error={errors.password}>
//         <GlassInput
//           id="signup-password"
//           type="password"
//           autoComplete="new-password"
//           placeholder="Min. 8 characters"
//           hasError={!!errors.password}
//           {...register("password", {
//             required: "Password is required.",
//             minLength: { value: 8, message: "At least 8 characters." },
//           })}
//         />
//       </Field>

//       <Field label="Confirm password" error={errors.confirm}>
//         <GlassInput
//           id="signup-confirm"
//           type="password"
//           autoComplete="new-password"
//           placeholder="••••••••"
//           hasError={!!errors.confirm}
//           {...register("confirm", {
//             required: "Please confirm your password.",
//             validate: (val) =>
//               val === watch("password") || "Passwords don't match.",
//           })}
//         />
//       </Field>

//       <SubmitButton
//         isLoading={isLoading}
//         label="Create account"
//         loadingLabel="Creating account…"
//       />

//       <p className="text-center text-xs text-white/30 leading-relaxed pt-1">
//         By signing up, you agree to our{" "}
//         <a
//           href="/terms"
//           className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
//         >
//           Terms
//         </a>{" "}
//         and{" "}
//         <a
//           href="/privacy"
//           className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
//         >
//           Privacy Policy
//         </a>
//         .
//       </p>
//     </form>
//   );
// }

// /* ── Shared sub-components ── */

// function Field({ label, error, labelRight, children }) {
//   return (
//     <div className="space-y-1.5">
//       <div className="flex items-center justify-between">
//         <label className="block text-[13px] font-medium text-white/60">
//           {label}
//         </label>
//         {labelRight}
//       </div>
//       {children}
//       {error && (
//         <p role="alert" className="text-xs text-red-400">
//           {error.message}
//         </p>
//       )}
//     </div>
//   );
// }

// import { forwardRef } from "react";

// const GlassInput = forwardRef(({ hasError, className = "", ...props }, ref) => (
//   <input
//     ref={ref}
//     className={`w-full h-10 px-3 text-sm text-white bg-white/5 border rounded-lg outline-none placeholder:text-white/25 transition-all
//       ${
//         hasError
//           ? "border-red-500/50 bg-red-500/5 focus:border-red-400/80 focus:ring-2 focus:ring-red-500/15"
//           : "border-white/10 hover:border-white/20 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/15"
//       } ${className}`}
//     {...props}
//   />
// ));
// GlassInput.displayName = "GlassInput";

// function SubmitButton({ isLoading, label, loadingLabel }) {
//   return (
//     <button
//       type="submit"
//       disabled={isLoading}
//       aria-busy={isLoading}
//       className="mt-1 w-full h-10 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
//     >
//       {isLoading ? (
//         <>
//           <svg
//             className="animate-spin size-4 opacity-70"
//             viewBox="0 0 24 24"
//             fill="none"
//             aria-hidden="true"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//             />
//           </svg>
//           {loadingLabel}
//         </>
//       ) : (
//         label
//       )}
//     </button>
//   );
// }

// function ErrorAlert({ message }) {
//   return (
//     <div
//       role="alert"
//       className="flex items-start gap-2 px-3.5 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] leading-snug"
//     >
//       <svg
//         className="mt-px shrink-0"
//         width="15"
//         height="15"
//         viewBox="0 0 16 16"
//         fill="none"
//         aria-hidden="true"
//       >
//         <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
//         <path
//           d="M8 5v3.5M8 11h.01"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//       </svg>
//       {message}
//     </div>
//   );
// }

// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { loginUser } from "../../api/auth.api";

// export default function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState("");

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     setServerError("");
//     try {
//       const response = await loginUser(data);
//       localStorage.setItem("token", response.token);
//       navigate("/dashboard");
//     } catch (error) {
//       setServerError(
//         error?.response?.data?.message || "Invalid email or password.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-zinc-50 font-sans">
//       {/* ── Brand panel (desktop only) ── */}
//       <aside className="hidden lg:flex lg:w-[420px] shrink-0 bg-zinc-900 flex-col justify-center gap-12 p-12 sticky top-0 h-screen">
//         {/* Logo */}
//         <div className="flex items-center gap-2.5">
//           <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
//             <rect
//               width="32"
//               height="32"
//               rx="8"
//               fill="white"
//               fillOpacity="0.1"
//             />
//             <rect x="8" y="8" width="7" height="7" rx="1.5" fill="white" />
//             <rect
//               x="17"
//               y="8"
//               width="7"
//               height="7"
//               rx="1.5"
//               fill="white"
//               fillOpacity="0.6"
//             />
//             <rect
//               x="8"
//               y="17"
//               width="7"
//               height="7"
//               rx="1.5"
//               fill="white"
//               fillOpacity="0.6"
//             />
//             <rect
//               x="17"
//               y="17"
//               width="7"
//               height="7"
//               rx="1.5"
//               fill="white"
//               fillOpacity="0.3"
//             />
//           </svg>
//           <span className="text-white text-[18px] font-semibold tracking-tight">
//             Acme
//           </span>
//         </div>

//         {/* Copy */}
//         <div className="space-y-3">
//           <h2 className="text-white text-[26px] font-semibold leading-snug tracking-tight">
//             The platform your team actually ships with.
//           </h2>
//           <p className="text-white/50 text-[15px] leading-relaxed">
//             Manage projects, track progress, and collaborate — all in one place.
//           </p>
//         </div>

//         {/* Feature list */}
//         <ul className="space-y-3">
//           {[
//             "Real-time collaboration",
//             "Role-based access control",
//             "Audit logs & compliance",
//           ].map((f) => (
//             <li
//               key={f}
//               className="flex items-center gap-2.5 text-white/70 text-sm"
//             >
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M3 8.5L6.5 12L13 5"
//                   stroke="white"
//                   strokeWidth="1.75"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               {f}
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* ── Form panel ── */}
//       <main className="flex flex-1 items-center justify-center px-6 py-10 min-h-screen">
//         <div className="w-full max-w-[400px] space-y-6">
//           {/* Mobile logo */}
//           <div className="flex lg:hidden items-center gap-2 mb-2">
//             <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
//               <rect width="32" height="32" rx="8" fill="#18181b" />
//               <rect x="8" y="8" width="7" height="7" rx="1.5" fill="white" />
//               <rect
//                 x="17"
//                 y="8"
//                 width="7"
//                 height="7"
//                 rx="1.5"
//                 fill="white"
//                 fillOpacity="0.6"
//               />
//               <rect
//                 x="8"
//                 y="17"
//                 width="7"
//                 height="7"
//                 rx="1.5"
//                 fill="white"
//                 fillOpacity="0.6"
//               />
//               <rect
//                 x="17"
//                 y="17"
//                 width="7"
//                 height="7"
//                 rx="1.5"
//                 fill="white"
//                 fillOpacity="0.3"
//               />
//             </svg>
//             <span className="text-zinc-900 text-base font-semibold">Acme</span>
//           </div>

//           {/* Header */}
//           <div className="space-y-1.5">
//             <h1 className="text-[22px] font-semibold text-zinc-900 tracking-tight">
//               Sign in to your account
//             </h1>
//             <p className="text-sm text-zinc-500">
//               Don't have an account?{" "}
//               <a
//                 href="/register"
//                 className="text-zinc-900 font-medium underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-900 transition-colors"
//               >
//                 Create one free
//               </a>
//             </p>
//           </div>

//           {/* Server error alert */}
//           {serverError && (
//             <div
//               role="alert"
//               className="flex items-start gap-2 px-3.5 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13.5px] leading-snug"
//             >
//               <svg
//                 className="mt-px shrink-0"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 aria-hidden="true"
//               >
//                 <circle
//                   cx="8"
//                   cy="8"
//                   r="7"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                 />
//                 <path
//                   d="M8 5v3.5M8 11h.01"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               {serverError}
//             </div>
//           )}

//           {/* Form */}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             noValidate
//             className="space-y-4"
//           >
//             {/* Email */}
//             <div className="space-y-1.5">
//               <label
//                 htmlFor="email"
//                 className="block text-[13.5px] font-medium text-zinc-700"
//               >
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 autoFocus
//                 placeholder="you@company.com"
//                 aria-invalid={!!errors.email}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//                 className={`w-full h-10 px-3 text-sm text-zinc-900 bg-white border rounded-lg outline-none placeholder:text-zinc-400 transition-all
//                   ${
//                     errors.email
//                       ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
//                       : "border-zinc-200 hover:border-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/8"
//                   }`}
//                 {...register("email", {
//                   required: "Email is required.",
//                   pattern: {
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Enter a valid email address.",
//                   },
//                 })}
//               />
//               {errors.email && (
//                 <p
//                   id="email-error"
//                   role="alert"
//                   className="text-xs text-red-600"
//                 >
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="space-y-1.5">
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-[13.5px] font-medium text-zinc-700"
//                 >
//                   Password
//                 </label>
//                 <a
//                   href="/forgot-password"
//                   className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 autoComplete="current-password"
//                 placeholder="••••••••"
//                 aria-invalid={!!errors.password}
//                 aria-describedby={
//                   errors.password ? "password-error" : undefined
//                 }
//                 className={`w-full h-10 px-3 text-sm text-zinc-900 bg-white border rounded-lg outline-none placeholder:text-zinc-400 transition-all
//                   ${
//                     errors.password
//                       ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
//                       : "border-zinc-200 hover:border-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/8"
//                   }`}
//                 {...register("password", {
//                   required: "Password is required.",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters.",
//                   },
//                 })}
//               />
//               {errors.password && (
//                 <p
//                   id="password-error"
//                   role="alert"
//                   className="text-xs text-red-600"
//                 >
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               aria-busy={isLoading}
//               className="mt-1 w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="animate-spin size-4 text-white/70"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />
//                   </svg>
//                   Signing in…
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           {/* Terms */}
//           <p className="text-center text-xs text-zinc-400 leading-relaxed">
//             By signing in, you agree to our{" "}
//             <a
//               href="/terms"
//               className="text-zinc-500 hover:text-zinc-900 underline underline-offset-2 transition-colors"
//             >
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a
//               href="/privacy"
//               className="text-zinc-500 hover:text-zinc-900 underline underline-offset-2 transition-colors"
//             >
//               Privacy Policy
//             </a>
//             .
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../api/auth.api";
// export default function LoginPage() {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const response = await loginUser(data);

//       localStorage.setItem("token", response.token);

//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-5">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="glass w-full max-w-md p-8 rounded-2xl"
//       >
//         <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

//         <input
//           {...register("email")}
//           placeholder="Email"
//           className="w-full p-3 rounded-xl bg-slate-900 mb-4"
//         />

//         <input
//           {...register("password")}
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 rounded-xl bg-slate-900 mb-6"
//         />

//         <button className="w-full bg-cyan-500 text-black font-semibold py-3 rounded-xl">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
