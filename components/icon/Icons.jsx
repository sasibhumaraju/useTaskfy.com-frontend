import { TbUserFilled, TbUsers } from "react-icons/tb";
import { SiPolywork } from "react-icons/si";
import { LuGrid2X2Check } from "react-icons/lu";
import { MdWorkOutline } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { FaAngleDown, FaChevronDown, FaTasks, FaUser, FaUserSecret } from "react-icons/fa";
import { LiaUserCircle } from "react-icons/lia";
import { RiAddLine, RiUserSmileLine } from "react-icons/ri";
import { HiMiniUser, HiUser } from "react-icons/hi2";
import { IoIosArrowDown, IoMdArrowRoundBack } from "react-icons/io";
import { IoChevronDown, IoChevronDownOutline, IoOptionsOutline } from "react-icons/io5";


const Icons =  {
    TEAM: <LuUsersRound/>,
    LIST: <LuGrid2X2Check/>,
    PROJECT: <MdWorkOutline/>,
    TASK: <FaTasks/>,
    USER: <HiUser />,
    BACK: <IoMdArrowRoundBack />,
    ADD: <RiAddLine />,
    FILTER: <IoOptionsOutline />,
    DROP_DOWN: <IoChevronDownOutline />
};

export default Icons;