import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from "@/asset/image/Logo.png";
import Image from "next/image"

export function EditInformation() {
  return (
    <Dialog >
      <form>
        <DialogTrigger asChild>
           <Button className="bg-black w-28 text-white hover:bg-transparent hover:no-underline">
          Edit
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm p-10">
          <DialogHeader>
            <DialogTitle>
                <Image src={logo} alt="Logo" width={100} height={50} className="mx-auto w-full mb-4" />
                <div className="fond-bold text-center">Change Password</div>
                </DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">New Password</Label>
              <Input id="name-1" name="name" defaultValue="*******" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Confirm New Password</Label>
              <Input id="username-1" name="username" defaultValue="*******" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
