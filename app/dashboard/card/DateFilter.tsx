import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusDot } from "@/components/ui/StatusDot";
import { ChevronDown, Clock, SlidersHorizontal } from "lucide-react";

const data = [
  "May 2022 - Oct 2022",
  "Nov 2022 - Apr 2023",
  "May 2023 - Oct 2023",
  "Nov 2023 - Apr 2024",
];

export default function Home() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-muted-foreground">
          May 2023 - Apr 2024
          <ChevronDown size={28} strokeWidth={0.75} absoluteStrokeWidth />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {data.map((item) => (
            <DropdownMenuItem key={item}>
                <div className="text-muted-foreground">{item}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
