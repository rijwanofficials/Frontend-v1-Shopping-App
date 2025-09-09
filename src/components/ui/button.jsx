const STYLES_MAPPING = {
    primary:
        "text-white px-2 py-1 rounded-md bg-pink-950 hover:bg-pink-700",
    "outline-primary":
        "border border-red-500 text-black/90 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white/90"
};

const Button = ({ children, className = "", onClick, variant = "primary" }) => {
    return (
        <button
            onClick={onClick}
            className={`${STYLES_MAPPING[variant]} cursor-pointer transition-transform hover:scale-105 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
