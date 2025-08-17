import toast from "react-hot-toast";

const ToastDark = ({ message, icon='👏' }) => {
    return toast(message, {
        icon: icon,
        style: {
            borderRadius: '10px',
            background: '#18181B',
            color: '#F3F4F6',
            fontWeight: '500',
            fontSize: '14px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            // border: '1px solid #27272A',
            border: '1px solid rgba(39, 39, 42, 0.3)',
        },
    });
};

export default ToastDark;