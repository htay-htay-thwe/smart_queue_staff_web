import { LoginForm } from "./LoginForm";
import { LogIn, Sparkles } from "lucide-react";

export default function loginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold text-black mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="w-8 h-8" />
                        Welcome Back
                    </h1>
                    <p className="text-white/80 text-sm">Sign in to manage your smart queue</p>
                </div>

                {/* Glass-morphism Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 animate-fade-in-delay-1">
                    <LoginForm />
                </div>

                {/* Footer */}
                <div className="text-center mt-6 animate-fade-in-delay-2">
                    <p className="text-white/70 text-sm">
                        © 2026 Smart Queue. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}