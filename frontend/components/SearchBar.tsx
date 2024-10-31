
export default function SerachBar({ children }: { children: string }) {
    return (
        <input type="text" className="border border-gray-200 p-2 rounded-md  text-sm" placeholder={children}
        />
    )
}