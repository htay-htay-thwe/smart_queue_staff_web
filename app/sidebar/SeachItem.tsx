import Image from "next/image";
import Noti from "@/asset/image/noti.png";
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Search } from "lucide-react";

export default function SearchItem() {
  return (
    <div className="p-6 w-full flex flex-row gap-4">
      <Image className="object-contain h-8 w-8" src={Noti} alt="Notification" />

        <InputGroup>
          <InputGroupInput id="input-group-url" placeholder="Search here ..." />
          <InputGroupAddon align="inline-end">
            <Search size={28} strokeWidth={1.5} absoluteStrokeWidth />
          </InputGroupAddon>
        </InputGroup>
    </div>
  );
}
