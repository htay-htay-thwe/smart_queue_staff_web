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
    <div className="flex w-full max-w-md flex-row items-center justify-end gap-2 sm:gap-3">
      <NotificationBell />

        <InputGroup className="hidden w-full rounded-xl border-slate-200 bg-slate-50 shadow-none transition-colors focus-within:bg-white sm:flex">
          <InputGroupInput
            id="workspace-search"
            aria-label="Search this page"
            placeholder="Search this page…"
            onChange={(e) => onSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <Search className="size-4 text-slate-400" />
          </InputGroupAddon>
        </InputGroup>
    </div>
  );
}
