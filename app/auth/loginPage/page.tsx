import { LoginForm } from "./LoginForm";

export default function loginPage() {
    return (
        <div className="flex flex-col justify-center h-full  sm:px-0 gap-6">
            <h1 className="uppercase text-start  font-medium text-2xl ">Join Queue Now</h1>
            <LoginForm />
        </div>

    );
}