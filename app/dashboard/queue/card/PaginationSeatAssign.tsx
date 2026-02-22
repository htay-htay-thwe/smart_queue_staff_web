import {
  PaginationNext,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationSeatAssignProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};
export default function PaginationSeatAssign({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationSeatAssignProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => setCurrentPage(i + 1)}
              isActive={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
