import ToastDark from "../util/Toastt";
import { axiosPrivateInstance } from "./AxiosClient";

const stillLoggedIn = async (email) => {
     try {
        const response = await axiosPrivateInstance.get(`user/by-email?email=${email}`);
        if (!response.status || response.status !== 200) {
                ToastDark({message: 'Something bad happended check your network or we will solve our issue from backend', icon: '😭'});
                return "error"; 
            }
        return response.data; 
    } catch (error) {
         if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message || 'An error occurred while fetching user data. Please try again.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while fetching user data. Please try again.',
            icon: '☹️'
        });}
        return null; 
    }
}

export  {stillLoggedIn}