const STYLES_MAPPING = {
    primary:
        "text-white px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-500",
    "outline-primary":
        "border border-blue-500 text-black/90 px-2 py-1 rounded-md hover:bg-blue-600 hover:text-white/90"
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
