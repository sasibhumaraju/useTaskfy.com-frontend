import ToastDark from "../util/Toastt";
import { axiosPrivateInstance } from "./AxiosClient";

const createCheck = async (check) => {
     try {
        const response = await axiosPrivateInstance.post(`/checklist`,check);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while adding new check.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
        ToastDark({
            message: 'New check added successfully.',
            icon: '✅'
        });
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'An error occurred while adding new check.' :'An error occurred while adding new check.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while adding new check.',
            icon: '☹️'
        });}
        return null;
    }
}

const deleteCheck = async (checkId) => {
     try {
        const response = await axiosPrivateInstance.delete(`/checklist/${checkId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while deleting check.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
        ToastDark({
            message: 'Check deleted successfully.',
            icon: '✅'
        });
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'An error occurred while deleting check.' :'An error occurred while deleting check.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while deleting check.',
            icon: '☹️'
        });}
        return null;
    }
}


export {createCheck, deleteCheck}