import Image from "next/image";
import Noti from "@/asset/image/noti.png";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Search } from "lucide-react";
import { NotificationBell } from "../components/NotificationBell";

export default function SearchItem() {
  return (
    <div className=" w-full flex flex-row max-w-md justify-end gap-4 px-10">
      <NotificationBell />

        <InputGroup className="w-full" >
          <InputGroupInput id="input-group-url" placeholder="Search here ..." />
          <InputGroupAddon align="inline-end">
            <Search size={28} strokeWidth={1.5} absoluteStrokeWidth />
          </InputGroupAddon>
        </InputGroup>
    </div>
  );
}
