import { FileText } from "lucide-react";

export default function Report() {
  return (
    <div className="p-6">
      {/* Modern Header */}
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
            <p className="text-sm text-gray-500 mt-1">View and generate business reports</p>
          </div>
        </div>
      </div>
      <p className="mt-4 animate-fade-in-delay-1">Report page</p>
    </div>
  );
}
