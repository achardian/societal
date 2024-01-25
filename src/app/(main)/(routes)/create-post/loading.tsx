"use client";

import OvalLoader from "@/components/oval-loader";

const Loading = () => {
  return (
    <div role="status" className="w-full flex items-center justify-center mt-5">
      <OvalLoader />
    </div>
  );
};

export default Loading;
