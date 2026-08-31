import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-soft-pink">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join the forum community
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}