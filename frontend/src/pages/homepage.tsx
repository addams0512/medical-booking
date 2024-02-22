import picture1 from "../assets/landingpage1.jpeg";
import picture2 from "../assets/landingpage2.jpeg";
import picture3 from "../assets/landingpage3.jpeg";
const HomePage = () => {
  return (
    <div className="w-full h-full flex-grow flex px-16 py-8">
      <div className="w-full h-[600px] relative">
        <div className="absolute text-6xl text-[#9C7178] left-0 top-[140px] italic font-medium">
          Your Convenient Path <br /> to <br /> Better Health!
        </div>
        <div className="absolute right-0 top-0 rounded-full bg-transparent w-[250px] h-[250px] border-[6px] border-[#7BB18E]/50">
          <img className="w-full h-full rounded-full" src={picture1}></img>
        </div>
        <div className="absolute right-[300px] top-[140px] rounded-full w-[250px] h-[250px] border-[6px] border-[#7BB18E]/50">
          {" "}
          <img className="w-full h-full rounded-full" src={picture2}></img>
        </div>
        <div className="absolute right-[50px] bottom-0 rounded-full w-[250px] h-[250px] border-[6px] border-[#7BB18E]/50">
          {" "}
          <img className="w-full h-full rounded-full" src={picture3}></img>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
