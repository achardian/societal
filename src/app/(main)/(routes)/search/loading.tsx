"use client";

import OvalLoader from "@/components/oval-loader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-5">
      <OvalLoader />
    </div>
  );
};

export default Loading;
