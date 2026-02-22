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

type FilterBtnProps = {
  setStatusFilter: (status: string | null) => void;
  setTimeSort: (sort: "earliest" | "latest" | null) => void;
};

export default function FilterBtn({ setStatusFilter, setTimeSort }: FilterBtnProps) {
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
           <DropdownMenuItem onClick={() => setStatusFilter(null)}>
            <div className="flex">
              {/* <div className="mt-1 mr-2">
                <StatusDot status="waiting" />
              </div> */}
              <div className="text-muted-foreground">All Statuses</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter('waiting')}>
            <div className="flex">
              <div className="mt-1 mr-2">
                <StatusDot status="waiting" />
              </div>
              <div className="text-muted-foreground">Waiting</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter('ready to seat')}>
            <div className="flex">
              <div className="mt-1 mr-2">
                <StatusDot status="ready to seat" />
              </div>
              <div className="text-muted-foreground">Ready to Seat</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter('canceled')}>
            <div className="flex">
              <div className="mt-1 mr-2">
                <StatusDot status="canceled" />
              </div>
              <div className="text-muted-foreground">Canceled</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTimeSort("earliest")}>
            <div className="flex">
              <Clock size={28} strokeWidth={0.75} />
              <div className="ml-2 text-muted-foreground">Earliest Time</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTimeSort("latest")}>
            <div className="flex">
              <Clock size={28} strokeWidth={0.75} />
              <div className="ml-2 text-muted-foreground">Latest Time</div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
