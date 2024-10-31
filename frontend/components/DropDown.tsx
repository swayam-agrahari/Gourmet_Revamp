interface DropDownProps {
    title: string;
    options: string[]
}

export default function DropDown({ title, options }: DropDownProps) {
    return (
        <div className="">
            <select className="p-2 bg-white  cursor-pointer" name={title}>
                {options.map((option, i) => {
                    return (
                        <option className="bg-white p-2" key={i} value={option} > {option}</option>
                    )
                })}
            </select>
        </div >

    )
}