"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { StepIndicator } from "../StepIndicator";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    email: z
        .string()
        .min(1, "* required")
        .email("* invalid email address"),
    shopName: z
        .string()
        .min(1, "* required"),
    phoneNumber: z
        .string()
        .min(1, "* required")
        .regex(/^[0-9]+$/, "* only numbers allowed"),
})

export default function StepOne() {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            shopName: "",
            phoneNumber: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })

         router.push("/auth/register/stepTwo");
    }

    return (
        <div>
            <StepIndicator currentStep={0} />
            <div className="w-full sm:max-w-md mt-5">
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="shopName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-shopName">
                                        gmail
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-shopName"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter shop name"
                                        autoComplete="off"
                                        className="h-12 rounded-full border border-[#157aa2] px-3"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-email">
                                        email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="example@gmail.com"
                                        autoComplete="off"
                                        className="h-12 rounded-full border border-[#157aa2] px-3"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-phoneNumber">
                                        phone number
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-phoneNumber"
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="09********"
                                        autoComplete="off"
                                        className="h-12 rounded-full border border-[#157aa2] px-3"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <Field orientation="horizontal" className="mt-8 px-3 gap-4 w-full justify-center">
                    <Button type="submit" form="form-rhf-demo" className="bg-[#157aa2] border w-full border-[#157aa2] hover:bg-white hover:text-black text-base rounded-md h-12 px-8 ">
                        Next
                    </Button>
                </Field>
            </div>
        </div>
    );
}