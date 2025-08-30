const Button = ({ children, className, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={` text-white cursor-pointer px-2 py-1 rounded-md bg-pink-950 hover:bg-pink-700 transition-transform
            ${className}`}>
            {children}
        </button >
    )
}
export { Button };