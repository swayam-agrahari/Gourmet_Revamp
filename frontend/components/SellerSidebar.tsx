import Link from "next/link"

interface SidebarProps {
    links: Array<{
        label: string,
        path: string,
        icon?: JSX.Element
    }>
}
export default function SellerSidebar({ links }: SidebarProps) {
    return (
        <>
            <div className="w-1/5 bg-white p-8 text-xl">
                {links.map(link => (
                    <Link key={link.label} href={link.path}>
                        <div className="w-full flex   items-center justify-center gap-2 py-4 mb-2 rounded-md bg-sky-50 cursor-pointer">
                            <span>{link.label}</span>
                        </div>
                    </Link>
                ))}

            </div >
        </>
    )
}