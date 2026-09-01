import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-soft-pink">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}