import Lottie from "lottie-react";
import loadingBlue from "@/asset/loading_blue.json";
export const Loading = () => {
  return (
    <div className="absolute inset-0 bg-gray-300/50  flex items-center justify-center z-50 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="w-70 h-70">
          <Lottie animationData={loadingBlue} loop />
        </div>
      </div>
    </div>
  );
};
