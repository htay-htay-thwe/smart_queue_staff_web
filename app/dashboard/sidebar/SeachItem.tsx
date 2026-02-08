import Image from "next/image";
import Noti from "@/asset/image/noti.png";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Search } from "lucide-react";

export default function SearchItem() {
  return (
    <div className=" w-full flex flex-row gap-4 px-10">
      <Image className="object-contain h-6 w-6 mt-2" src={Noti} alt="Notification" />

        <InputGroup className="w-full" >
          <InputGroupInput id="input-group-url" placeholder="Search here ..." />
          <InputGroupAddon align="inline-end">
            <Search size={28} strokeWidth={1.5} absoluteStrokeWidth />
          </InputGroupAddon>
        </InputGroup>
    </div>
  );
}
