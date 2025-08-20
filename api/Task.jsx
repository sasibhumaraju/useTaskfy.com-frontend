import ToastDark from "../util/Toastt";
import { axiosPrivateInstance } from "./AxiosClient";

const getActiveTasksByTeamId = async (teamId) => {
     try {
        const response = await axiosPrivateInstance.get(`/task/getIncompleteTasksByTeamId/${teamId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while fetching tasks.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
        
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        
        if (error.response) {
            ToastDark({ message: error.response.data.message? 'An error occurred while fetching tasks.' :'An error occurred while fetching tasks.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while fetching tasks. ',
            icon: '☹️'
        });}
        return null;
    }
}

const addNewTask = async (task) => {
     try {
        const response = await axiosPrivateInstance.post(`/task/addNewTask`,task);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while creating task.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
         ToastDark({
            message: `Task added to team successfully.`,
            icon: '✅'
        });
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        
        if (error.response) {
            ToastDark({ message: error.response.data.message? 'An error occurred while creating task.' :'An error occurred while creating task.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while creating task.',
            icon: '☹️'
        });}
        return null;
    }
}


const acknowledgeTaskByMe = async (taskId) => {
     try {
        const response = await axiosPrivateInstance.put(`/task/acknowledgeTask/${taskId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while acknowledging task.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
         ToastDark({
            message: `Task acknowledged successfully.`,
            icon: '✅'
        });
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        
        if (error.response) {
            ToastDark({ message: error.response.data.message? 'An error occurred while acknowledging task.' :'An error occurred while acknowledging task.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while acknowledging task.',
            icon: '☹️'
        });}
        return null;
    }
}

const completeTaskByMe = async (taskId) => {
     try {
        const response = await axiosPrivateInstance.put(`/task/completeTask/${taskId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while completing task',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
         ToastDark({
            message: `Task completed`,
            icon: '✅'
        });
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        
        if (error.response) {
            ToastDark({ message: error.response.data.message? 'An error occurred while completing task' :'An error occurred while completing task',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while completing task',
            icon: '☹️'
        });}
        return null;
    }
}


const killTaskByMe = async (taskId) => {
     try {
        const response = await axiosPrivateInstance.put(`/task/killTask/${taskId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while killing task',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
         ToastDark({
            message: `Task killed`,
            icon: '✅'
        });
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        
        if (error.response) {
            ToastDark({ message: error.response.data.message? 'An error occurred while killing task' :'An error occurred while killing task',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while killing task',
            icon: '☹️'
        });}
        return null;
    }
}








export {getActiveTasksByTeamId, addNewTask, acknowledgeTaskByMe, completeTaskByMe, killTaskByMe}