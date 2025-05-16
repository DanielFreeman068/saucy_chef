import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-[250px] md:h-[300px] bg-header overflow-hidden shadow-lg shadow-[#00000033]">
        {/* Bottom Left Bowl */}
        <Image
          src="/curry.png"
          alt="Bottom Bowl"
          width={250}
          height={250}
          className="absolute bottom-0 left-0 w-[230px] md:w-[300px] lg:w-[400px] z-0"
        />

        {/* Top Right Bowl */}
        <Image
          src="/acai.png"
          alt="Top Bowl"
          width={250}
          height={250}
          className="absolute top-0 right-0 w-[230px] md:w-[300px] lg:w-[400px] z-0"
        />

        <div className="relative z-10 flex items-center justify-evenly h-full w-full">
          <Image
            src="/saucy_chef_logo2.png"
            alt="Saucy Chef Logo"
            width={100}
            height={100}
            className="w-[50px] md:w-[80px] lg:w-[100px]"
          />
          <h1 className="text-textPrimary">Explore Recipes</h1>
          <h1>Freeman</h1>
        </div>
      </div>


    </div>
  );
}
