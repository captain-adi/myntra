import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useLogout } from "../../hooks/query";
function ProfileDropdown() {
  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <div className="flex flex-col items-center">
          <User className="text-2xl" />
          <span className="text-[0.7rem]">Profile</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CircleUserRound className="size-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
