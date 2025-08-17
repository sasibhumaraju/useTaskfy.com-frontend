import ToastDark from "../util/Toastt";
import { axiosPrivateInstance } from "./AxiosClient";


const getUserByEmail = async (email) => {
    try {
        const response = await axiosPrivateInstance.get(`user/by-email?email=${email}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while fetching user data. Please try again.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }

        console.log(JSON.stringify(response));

        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        // console.log(JSON.stringify(error));
         if (error.response) {
            console.log("Data:", error.response.data); // <-- backend JSON body here
            ToastDark({
                message: error.response.data.message || 'An error occurred while fetching user data. Please try again.',
                icon: '🙃'
            });
        } else {

        ToastDark({
            message: 'An error occurred while fetching user data. Please try again.',
            icon: '☹️'
        });}
        return null; // Return null or handle the error as needed
    }
};

const updateUser = async (updatedUser) => {
    try {
        const response = await axiosPrivateInstance.post(`user/update`,updatedUser);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while updating user data. Please try again.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }

        ToastDark({
            message: 'User updated successfully.',
            icon: '✅'
        });

        console.log(JSON.stringify(response));

        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        console.log(JSON.stringify(error.message));

        ToastDark({
            message: error.message || 'An error occurred while updating user data. Please try again.',
            icon: '☹️'
        });
        return null; // Return null or handle the error as needed
    }
}


const searchUsersByEmail = async (emailKeyword) => {
    try {
        const response = await axiosPrivateInstance.get(`user/searchByEmail?email=${emailKeyword}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'kkAn error occurred while fetching users. Please try again.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }

        // console.log(JSON.stringify(response));

        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        console.log(JSON.stringify(error));
         if (error.response) {
            console.log("Data:", error.response.data); // <-- backend JSON body here
            ToastDark({
                message: error.response.data.message || 'An error occurred while fetching users. Please try again.',
                icon: '🙃'
            });
        } else {

        ToastDark({
            message: 'An error occurred while fetching users. Please try again.',
            icon: '☹️'
        });}
        return null; // Return null or handle the error as needed
    }
};

export { getUserByEmail, updateUser, searchUsersByEmail };