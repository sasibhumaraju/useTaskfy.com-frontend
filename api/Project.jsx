import ToastDark from "../util/Toastt";
import { axiosPrivateInstance } from "./AxiosClient";

const addProjectToTeam = async (teamId, project) => {
     try {
        const response = await axiosPrivateInstance.post(`/team/${teamId}/addProject`,project);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while adding project to the team.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
        ToastDark({
            message: `Project add to ${ response && response.data && response.data.name} team created successfully.`,
            icon: '✅'
        });
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'An error occurred while adding project to the team.' :'An error occurred while adding project to the team.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while adding project to the team.',
            icon: '☹️'
        });}
        return null;
    }
}



const removeProjectFromTeam = async (teamId, projectId) => {
     try {
        const response = await axiosPrivateInstance.delete(`/team/${teamId}/removeProject?projectId=${projectId}`);

        if (!response.status || response.status !== 200) {
                ToastDark({
                    message: "An error occurred while removing project from team.",
                    icon: '☹️'
                });
                return null; // Return null or handle the error as needed
            }


        ToastDark({
            message: 'Project removed successfully!',
            icon: '✅'
        });
       
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark( {message: 'An error occurred while removing project from team.', icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while removing project from team.',
            icon: '☹️'
        });}
        return null;
    }
}

export { addProjectToTeam, removeProjectFromTeam  }