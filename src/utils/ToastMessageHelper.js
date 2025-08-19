import { Bounce, ToastContainer, toast } from 'react-toastify';


const ShowErrorToast = (txt) => {
    toast.error(txt, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    })
};

const ShowSuccessToast = (txt) => {
    toast.success(txt, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
};


export { ShowErrorToast, ShowSuccessToast }