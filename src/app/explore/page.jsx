import React from 'react'

const ExplorePage = () => {
    return (
        <>
        <div>
        {/* header section */}
        <div className="relative w-full h-[150px] bg-[#F4E2CE] overflow-hidden shadow-lg shadow-[#00000033]">
            {/* Bottom Left Bowl */}
            <Image
            src="/curry.png"
            alt="Bottom Bowl"
            width={250}
            height={250}
            className="absolute bottom-0 left-0 w-[130px] md:w-[200px] z-0"
            />

            {/* Top Right Bowl */}
            <Image
            src="/acai.png"
            alt="Top Bowl"
            width={250}
            height={250}
            className="absolute top-0 right-0 w-[130px] md:w-[200px] z-0"
            />

            <div className="relative z-10 flex items-center flex-col sm:flex-row justify-evenly align-center h-full w-full shadow-lg">
            <div className="flex justify-evenly items-center gap-5 sm:gap-10 md:gap-20 lg:gap-32 xl:gap-48">
                <Image
                src="/saucy_chef_logo2.png"
                alt="Saucy Chef Logo"
                width={100}
                height={100}
                className="w-[50px] md:w-[80px] lg:w-[100px]"
                />
                <h1 className="text-[#953306] text-xl sm:text-2xl md:text-3xl lg:text-4xl">Explore Recipes</h1>
            </div>
            <div className="flex flex-row gap-6">
                <a href="/" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">Create</a>
                <a href="/meal-planner" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">My Week</a>
            </div>
            </div>
        </div>

        {/* recipes section */}
        <h1>hello</h1>
        </div>
        </>
    )
}

export default ExplorePage