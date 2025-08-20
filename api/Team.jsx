import ToastDark from "../util/Toastt";
import { axiosPrivateInstance } from "./AxiosClient";


const createTeam = async (team) => {
     try {
        const response = await axiosPrivateInstance.post(`/team`,team);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while creating team. Please try again.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
        ToastDark({
            message: 'Team created successfully.',
            icon: '✅'
        });
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'Team with same name already exists' :'An error occurred while creating team. Please try again.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while creating team. Please try again.',
            icon: '☹️'
        });}
        return null;
    }
}


const getTeamsByUserId = async (userId) => {
     try {
        const response = await axiosPrivateInstance.get(`/team/getTeamsByUserId/${userId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while fetching teams.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
       
        // console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'No teams found for you create new team start' :'An error occurred while creating team.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while creating team. ',
            icon: '☹️'
        });}
        return null;
    }
}

const getUsersByTeamId = async (teamId) => {
     try {
        const response = await axiosPrivateInstance.get(`/team/getUsersByTeamId/${teamId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: "An error occurred while fetching team's users. Please try again.",
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
       
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'No users found for this team add people' :'An error occurred while creating team. Please try again.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while getting team users. Please try again.',
            icon: '☹️'
        });}
        return null;
    }
}



const addUsersToTeam = async (teamId, userIds) => {
     try {
        const response = await axiosPrivateInstance.post(`/team/${teamId}/addMembers`,userIds);

        if (!response.status || response.status !== 200) {
                ToastDark({
                    message: "An error occurred while adding member to team. Please try again.",
                    icon: '☹️'
                });
                return null; // Return null or handle the error as needed
            }


        ToastDark({
            message: 'Members added to team successfully!',
            icon: '✅'
        });
       
       
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'No users ot team found for this request' :'An error occurred while adding member to team. Please try again.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while adding member to team. Please try again.',
            icon: '☹️'
        });}
        return null;
    }
}





const removeUserFromTeam = async (teamId, userId) => {
     try {
        const response = await axiosPrivateInstance.delete(`/team/${teamId}/removeMember?memberId=${userId}`);

        if (!response.status || response.status !== 200) {
                ToastDark({
                    message: "An error occurred while removing member from team. Please try again.",
                    icon: '☹️'
                });
                return null; // Return null or handle the error as needed
            }


        ToastDark({
            message: 'Member removed successfully!',
            icon: '✅'
        });
       
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark( {message: 'An error occurred while adding member to team. Please try again.', icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while removing member from team. Please try again.',
            icon: '☹️'
        });}
        return null;
    }
}



const getTeamsWithProjectsByUserId = async (userId) => {
     try {
        const response = await axiosPrivateInstance.get(`/team/getTeamsWithProjectsByUserId/${userId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while fetching teams with projects.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
       
        console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'No teams and projects found for you' :'An error occurred while fetching teams with projects.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while fetching teams with projects.',
            icon: '☹️'
        });}
        return null;
    }
}


const getTeamsWithProjectsAndChecklistsByUserId = async (userId) => {
     try {
        const response = await axiosPrivateInstance.get(`/team/getTeamsWithProjectsAndChecklistByUserId/${userId}`);
       if (!response.status || response.status !== 200) {
            ToastDark({
                message: 'An error occurred while fetching teams with projects and checklists.',
                icon: '☹️'
            });
            return null; // Return null or handle the error as needed
        }
       
        // console.log(JSON.stringify(response));
        return response.data; // Assuming the API returns user data or a success message
    } catch (error) {
        if (error.response) {
            console.log("Data:", error.response.data.message); // <-- backend JSON body here
            ToastDark({ message: error.response.data.message? 'No teams and projects found for you' :'An error occurred while fetching teams with projects and checklists.',icon: '🙃'});
        } else {
        ToastDark({
            message: 'An error occurred while fetching teams with projects and checklists.',
            icon: '☹️'
        });}
        return null;
    }
}



export { createTeam, getTeamsByUserId, getUsersByTeamId, addUsersToTeam, removeUserFromTeam, getTeamsWithProjectsByUserId, getTeamsWithProjectsAndChecklistsByUserId }