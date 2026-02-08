import PaginationSeatAssign from "../queue/card/PaginationSeatAssign";
import OneCard from "./card/OneCard";

export default function Queue() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">History</h1>
      <OneCard />
      <div className="mt-5"><PaginationSeatAssign /></div>

    </div>
  );
}
