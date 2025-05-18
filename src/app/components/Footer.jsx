import React from 'react'

const Footer = () => {
    return (
        <>
            {/* footer section */}
            <footer className="bg-[#B53325] text-white w-full px-6 py-6">
                <div className="max-w-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left side: Legal + Copyright in a row */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 text-center ">
                        <h3 className="text-xl font-semibold">Legal</h3>
                        <p className="text-sm">
                            © {new Date().getFullYear()} Daniel Freeman, Sabrina Shafer, Oliver Kuopus. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer