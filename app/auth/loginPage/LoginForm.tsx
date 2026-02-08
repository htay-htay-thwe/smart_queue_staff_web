"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"


const formSchema = z.object({
    email: z
        .string()
        .min(1, "* required")
        .email("* invalid email address"),
    password: z
        .string()
        .min(8, "at least 8 characters required")
})

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
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
    }

    return (
        <div className="w-full sm:max-w-md">
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-email">
                                    gmail
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
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
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-password">
                                    password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-password"
                                    type="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
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
            <Field orientation="horizontal" className="mt-8 px-3 grid grid-cols-2 gap-4 w-full justify-center">
                <Button type="submit" form="form-rhf-demo" className="bg-[#157aa2] border border-[#157aa2] hover:bg-white hover:text-black text-base rounded-md h-12 px-8 ">
                    Login
                </Button>
                <Link
                    href="/auth/register"
                    className="text-[#157aa2] text-sm underline hover:text-black underline-offset-4">
                    Go to Register Page
                </Link>


            </Field>
        </div>
    )
}
