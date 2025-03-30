import { useRef, useState } from 'react';
import {useOutsideClick} from './TopBar'
import UserCard from './UserCard';

export default function UserMenu({ theme, primaryColors, primaryHover }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    useOutsideClick(dropdownRef, () => setShowDropdown(false));
  
    const toggleDropdown = () => setShowDropdown(!showDropdown);
  
    return (
      <div className={`relative flex items-center cursor-pointer p-2 rounded-full ${primaryHover}`}>
        <button
          onClick={toggleDropdown}
          className={`w-10 h-10 rounded-full overflow-hidden border-2 ${primaryColors} focus:outline-none`}
        >
          <img
            src="https://placehold.co/45x45"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </button>
        {showDropdown && (
          <div ref={dropdownRef} className="absolute right-0 top-full mt-2">
            <UserCard theme={theme} />
          </div>
        )}
      </div>
    );
  }