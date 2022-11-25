import DmIcon from "@/atom/DmIcon";
import ChatIcon from "@/atom/ChatIcon";
import FriendIcon from "@/atom/FriendIcon";
import { SidebarItem } from "@/pages/Main";

interface NavProps {
    current: string;
    onChange(n: SidebarItem): void;
}

const Nav = ({ current, onChange }: NavProps) => {
    return (
        <div className="flex w-full h-[78px] bg-background/[0.87] justify-between items-center" id="nav">
            navtext
          <div className="flex items-center gap-2">
            <div className="">
              <button onClick={() => onChange('chat')}>
                <ChatIcon isActive={current === 'chat'}/>
              </button>
            </div>
            <div className="">
              <button onClick={() => onChange('friend')}>
                <FriendIcon isActive={current === 'friend'}/>
              </button>
            </div>
            <div className="">
              <button onClick={() => onChange('dm')}>
                <DmIcon isActive={current === 'dm'}/>
              </button>
            </div>
          </div>


        </div>
    )
}

export default Nav;
