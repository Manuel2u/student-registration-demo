import { CREATE_STUDENT, DASHBOARD } from "../constants/page-paths";

import { UserCircleIcon, HomeIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  {
    name: "Dashboard",
    href: DASHBOARD,
    icon: HomeIcon,
  },
  {
    name: "Students",
    href: CREATE_STUDENT,
    icon: UserCircleIcon,
  },
];

export default navigation;
