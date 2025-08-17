import ToastDark from "../util/Toastt";
import { axiosPrivateInstance, axiosPublicInstance } from "./AxiosClient";


const sendVerificationMail = async (email) => {
    try {
        const response = await axiosPublicInstance.post('/email/sendVerificationCode', { email });

        console.log(JSON.stringify(response.data));
        console.log(`Response status: ${response.status}`);
        console.log(`Response ok: ${response.ok}`);
        
        
        if (!response.status || response.status !== 200) {
            ToastDark({
            message: 'An error occurred while sending verification email. Please try again.',
            icon: '☹️'
        });
        return false
        }

         ToastDark({
            message: 'Verification email sent successfully. Please check your inbox.',
            icon: '✅'
        });
        return true;

    } catch (error) {
        console.log(JSON.stringify(error.response.data.message));

        ToastDark({
            message: error.response.data.message || 'An error occurred while sending verification email. Please try again.',
            icon: '☹️'
        });
        return false;
    }
}

const verifyCode = async (email, code) => {
    try {
        const response = await axiosPublicInstance.post('/email/verifyCode', { email, code });    

         if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while verifying the code. Please try again.',
                icon: '☹️'
            });
            return false;
        }

        ToastDark({
            message: 'Verification code verified successfully.',
            icon: '✅'
        });
        return true;

    } catch (error) {
        // console.log(JSON.stringify(error.response.data.message));
        console.log(JSON.stringify(error.response.data));
        
        ToastDark({
            message: error.response.data || 'An error occurred while verifying the code. Please try again.',
            icon: '☹️'
        });
        return false;
    }
}

export {sendVerificationMail, verifyCode}
