import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { NotificationBell } from "../components/NotificationBell";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchItem({ onSearch }: Props) {
  return (
    <div className=" w-full flex flex-row max-w-md justify-end gap-4 px-10">
      <NotificationBell />

        <InputGroup className="w-full">
          <InputGroupInput
            id="input-group-url"
            placeholder="Search here ..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <Search size={28} strokeWidth={1.5} absoluteStrokeWidth />
          </InputGroupAddon>
        </InputGroup>
    </div>
  );
}
