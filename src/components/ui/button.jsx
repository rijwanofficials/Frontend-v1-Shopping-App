
const STYLES_MAPPING = {
    primary: " text-white cursor-pointer px-2 py-1 text-white cursor-pointer px-2 py-1 rounded-md bg-pink-950 hover:bg-pink-700 transition-transform bg-pink-950 hover:bg-pink-700 transition-transform",
    "outline-primary":"border border-red-500 text-black/90 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white/90"
}



const Button = ({ children, className, onClick, size, variant = "primary" }) => {
    return (
        <button
            size={size}
            onClick={onClick}
            className={` cursor-pointer transition hover:scale-102 ${STYLES_MAPPING[variant]} ${className}`}>
            {children}
        </button >
    )
}
export { Button };