import ToastDark from "../util/Toastt";
import { axiosPrivateInstance, axiosPublicInstance } from "./AxiosClient";


const registerUser = async (userData) => {
    try {
        const response = await axiosPublicInstance.post('/auth/register', userData);

        if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while registering. Please try again.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }

        ToastDark({
            message: 'Registration successful. Enjoy using our service!',
            icon: '✅'
        });
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        console.log(JSON.stringify(error.response.data));

        ToastDark({
            message: error.response.data.message || 'An error occurred while registering. Please try again.',
            icon: '☹️'
        });
        return null; // Return null or handle the error as needed
    }
}

const authenticateUser = async (email, password) => {
    try {
        const response = await axiosPublicInstance.post('/auth/authenticate', { email, password });

        if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while logging in. Please try again.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }

        ToastDark({
            message: 'Login successful. Welcome back!',
            icon: '✅'
        });
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        console.log(JSON.stringify(error.response.data));

        ToastDark({
            message: error.response.data.message? "Invalid credentials. Please try again." : 'An error occurred while logging in. Please try again.',
            icon: '☹️'
        });
        
        return null; // Return null or handle the error as needed
    }
}

export {registerUser, authenticateUser}
