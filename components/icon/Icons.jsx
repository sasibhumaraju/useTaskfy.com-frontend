import { TbClockQuestion, TbLivePhoto, TbUserFilled, TbUsers } from "react-icons/tb";
import { SiPolywork } from "react-icons/si";
import { LuGrid2X2Check, LuUserRound } from "react-icons/lu";
import { MdOutlineDarkMode, MdOutlineTaskAlt, MdWorkOutline } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { FaAngleDown, FaChevronDown, FaTasks, FaUser, FaUserSecret } from "react-icons/fa";
import { LiaUserCircle } from "react-icons/lia";
import { RiAddLine, RiFocus3Line, RiUserSmileLine } from "react-icons/ri";
import { HiMiniUser, HiUser } from "react-icons/hi2";
import { IoIosArrowDown, IoMdArrowRoundBack, IoMdLogOut, IoMdTime } from "react-icons/io";
import { IoChevronDown, IoChevronDownOutline, IoClose, IoOptionsOutline } from "react-icons/io5";
import { PiMicrosoftTeamsLogo } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import { FiInfo } from "react-icons/fi";


const Icons =  {
    TEAM: <LuUsersRound/>,
    LIST: <LuGrid2X2Check/>,
    PROJECT: <MdWorkOutline/>,
    TASK: <FaTasks/>,
    USER: <HiUser />,
    BACK: <IoMdArrowRoundBack />,
    ADD: <RiAddLine />,
    FILTER: <IoOptionsOutline />,
    DROP_DOWN: <IoChevronDownOutline />,
    CLOSE: <IoClose />,
    TIME: <IoMdTime />,
    TAG_TEAM: <PiMicrosoftTeamsLogo />,
    LIVE: <TbLivePhoto />,
    OVERDUE: <TbClockQuestion />,
    FOCUSED: <RiFocus3Line />,
    FINISHED: <MdOutlineTaskAlt />,
    TAG_USER: <LuUserRound />,
    OPTIONS: <SlOptions />,
    LOGOUT: <IoMdLogOut />,
    DARKTHEME: <MdOutlineDarkMode />,
    INFO: <FiInfo />

};

export default Icons;