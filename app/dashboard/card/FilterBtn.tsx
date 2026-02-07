import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusDot } from "@/components/ui/StatusDot";
import { Clock, SlidersHorizontal } from "lucide-react";

export default function FilterBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal size={18} color="black" strokeWidth={0.75} />{" "}
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex">
              <div className="mt-1 mr-2">
                <StatusDot status="pending" />
              </div>
              <div className="text-muted-foreground">Pending</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex">
              <div className="mt-1 mr-2">
                <StatusDot status="accepted" />
              </div>
              <div className="text-muted-foreground">Queued</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex">
              <div className="mt-1 mr-2">
                <StatusDot status="canceled" />
              </div>
              <div className="text-muted-foreground">Waiting</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem><Clock size={28} strokeWidth={0.75} />Earliest Time </DropdownMenuItem>{" "}
          <DropdownMenuItem><Clock size={28} strokeWidth={0.75} />Latest Time </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
