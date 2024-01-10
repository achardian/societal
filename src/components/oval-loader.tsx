import { Oval } from "react-loader-spinner";

const OvalLoader = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Oval
        visible={true}
        height="40"
        width="40"
        color="#525CEB"
        secondaryColor="#11009E"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default OvalLoader;
