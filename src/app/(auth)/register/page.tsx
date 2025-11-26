import { RegisterForm } from "@/components/auth/register-form";
import { redirectIfAuthenticated } from "@/lib/auth-server";

export default async function RegisterPage() {
    // Redirect to dashboard if already authenticated
    await redirectIfAuthenticated();

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
}
