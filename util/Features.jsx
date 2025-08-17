import { Icon, Icons } from "../components";
import { IconSizes } from "../strings/constants";

const useTaskfyCoreFeatures = [
  {
    icon: <span style={{color:"#1565C0"}}  ><Icon size={IconSizes.md} icon={Icons.PROJECT}></Icon></span>,
    title: "Project Organization",
    message: "Group related tasks and checklist under projects for better structure and progress tracking."
  },
  {
    icon: <span style={{color:"#EF6C00"}}  ><Icon size={IconSizes.md} icon={Icons.TEAM}></Icon></span>,
    title: "Team Collaboration",
    message: "Add team members, assign roles, and collaborate across shared tasks and checklists."
  },
  {
    icon: <span style={{color:"#2E7D32"}} ><Icon size={IconSizes.md} icon={Icons.TASK}></Icon></span>,
    title: "Task Management",
    message: "Create, assign, and track tasks with priorities and deadlines to stay on top of work."
  },
  {
    icon: <span style={{color:"#00796B"}}  ><Icon size={IconSizes.md} icon={Icons.LIST}></Icon></span>,
    title: "Checklists",
    message: "Add tasks in checklist and schedule them on timely basis without human intervention for better clarity and execution."
  },
  {
    icon: <span style={{color:"#C62828"}}  ><Icon size={IconSizes.md} icon={Icons.FILTER}></Icon></span>,
    title: "Smart Filters & Views",
    message: "Filter tasks by team, status, or priority, and switch between list or board views effortlessly."
  },
  {
    icon: <span style={{color:"#512DA8"}}  ><Icon size={IconSizes.md} icon={Icons.DARKTHEME}></Icon></span>,
    title: "Dark Mode Interface",
    message: "Upcoming, Beautifully designed dark theme for improved focus and aesthetics during long sessions."
  }
];

export default useTaskfyCoreFeatures;
