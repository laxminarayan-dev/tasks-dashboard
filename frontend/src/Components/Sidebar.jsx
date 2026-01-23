const Sidebar = ({ isSidebarOpen }) => {
    const active = "html"
    const links = [
        { name: "HTML", to: "#html", id: 1 },
        { name: "HTML & CSS", to: "#html-css", id: 2 },
        { name: "HTML & CSS & JS", to: "#html-css-js", id: 3 },
        { name: "React", to: "#react", id: 4 },
    ];
    return (
        //  outer box of sidebar used for adjusting sidebar base on display size 
        <div className={`fixed left-0 top-0 h-screen w-64 bg-gray-100 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64 z-40`}>
            <div className="relative z-20 h-screen flex flex-col">

                <div className="px-5 py-6 flex flex-col gap-6 h-full">
                    <h2 className="text-3xl font-bold">Laxmi Narayan</h2>
                    <hr />
                    <nav className="">
                        <p className="text-xl font-bold mb-4 text-gray-700">Type of Tasks</p>
                        <ul className="flex flex-col gap-3 ">
                            {links.map((link) => (
                                <li key={link.id} >
                                    <a href={link.to} className={`flex w-full rounded-md px-2 py-1 text-lg md:text-md font-semibold ${active === link.name.toLowerCase() ? 'text-gray-100 bg-slate-900' : 'text-gray-400'}`}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    )
}
export default Sidebar