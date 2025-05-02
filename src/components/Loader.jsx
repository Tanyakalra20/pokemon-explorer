import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="flex justify-center items-center rounded-lg  w-[80px] md:w-[100px]">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3498db"  
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
