// /// rough working  #2
// import { useState, useEffect, useRef, MouseEvent, KeyboardEvent } from "react";
// import { FiGlobe, FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
// import { useSession } from "@supabase/auth-helpers-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";


// const UserProfile: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const session = useSession();
//   const router = useRouter();

//   const userData = {
//     name: session?.user?.user_metadata?.full_name || "Unknown User",
//     email: session?.user?.email || "No email",
//     profileImage:
//       session?.user?.user_metadata?.avatar_url ||
//       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cleanpng.com%2Fpng-computer-icons-user-profile-clip-art-big-902937%2F&psig=AOvVaw10hF22UoY-yaSRcmvwJlut&ust=1740585817567000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwiVopDMmd-LAxU2ckEAHTRfE6QQjRx6BAgAEBk",
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsVisible(false);
//         setTimeout(() => setIsOpen(false), 300);
//       }
//     };

//     const handleEscKey = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsVisible(false);
//         setTimeout(() => setIsOpen(false), 300);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscKey);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscKey);
//     };
//   }, []);

//   //trial 
//    const handleSignOut = async () => {
//       await supabase.auth.signOut();
//       router.push("/auth"); // Redirect after logout
//     };

//   const handleDropdownToggle = () => {
//     if (!isOpen) {
//       setIsOpen(true);
//       setTimeout(() => setIsVisible(true), 50);
//     } else {
//       setIsVisible(false);
//       setTimeout(() => setIsOpen(false), 300);
//     }
//   };

//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     (e.target as HTMLImageElement).src =
//       "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={handleDropdownToggle}
//         className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//         aria-label="Open account menu"
//       >
//         <img
//           src={userData.profileImage}
//           alt="Profile"
//           onError={handleImageError}
//           className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
//           loading="lazy"
//         />
//         <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">{userData.email}</span>
//       </button>

//       {isOpen && (
//         <div
//           className={`absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl py-4 transition-all duration-300 ease-in-out transform ${
//             isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"
//           } dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
//         >
//           <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={userData.profileImage}
//                 alt="Profile"
//                 onError={handleImageError}
//                 className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
//                 loading="lazy"
//               />
//               <div className="space-y-1">
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
//                   {userData.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{userData.email} </p>
//               </div>
//             </div>
//           </div>

//           <div className="px-2 py-2 space-y-1">
//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 text-gray-600  dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
//               <FiGlobe className="w-5 h-5" />
//               <span className="font-medium">Language</span>
//             </button>
//           </div>

//           <div className="px-2 py-2 mt-2 border-t border-gray-200 dark:border-gray-700">
//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-blue-600 dark:text-blue-400">
//               <FiEdit3 className="w-5 h-5" />
//               <span className="font-medium">Edit Profile</span>
//             </button>

//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400">
//               <FiSettings className="w-5 h-5" />
//               <span className="font-medium">Account Settings</span>
//             </button>

//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-red-600 dark:text-red-400" onClick={handleSignOut}>
//               <FiLogOut className="w-5 h-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

// //working #2
// import { useState, useEffect, useRef, MouseEvent, KeyboardEvent } from "react";
// import { FiGlobe, FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
// import { useSession } from "@supabase/auth-helpers-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// interface UserData {
//   name: string;
//   email: string;
//   profileImage: string;
//   created: string;
//   role?: string;
//   organization?: string;
// }

// interface UserProfileProps {
//   userData: UserData;
// }

// const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const session = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsVisible(false);
//         setTimeout(() => setIsOpen(false), 300);
//       }
//     };

//     const handleEscKey = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsVisible(false);
//         setTimeout(() => setIsOpen(false), 300);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscKey);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscKey);
//     };
//   }, []);

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.push("/auth"); // Redirect after logout
//   };

//   const handleDropdownToggle = () => {
//     if (!isOpen) {
//       setIsOpen(true);
//       setTimeout(() => setIsVisible(true), 50);
//     } else {
//       setIsVisible(false);
//       setTimeout(() => setIsOpen(false), 300);
//     }
//   };

//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     (e.target as HTMLImageElement).src =
//       "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={handleDropdownToggle}
//         className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//         aria-label="Open account menu"
//       >
//         <img
//           src={userData.profileImage}
//           alt="Profile"
//           onError={handleImageError}
//           className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
//           loading="lazy"
//         />
//         <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">{userData.email}</span>
//       </button>

//       {isOpen && (
//         <div
//           className={`absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl py-4 transition-all duration-300 ease-in-out transform ${
//             isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"
//           } dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
//         >
//           <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={userData.profileImage}
//                 alt="Profile"
//                 onError={handleImageError}
//                 className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
//                 loading="lazy"
//               />
//               <div className="space-y-1">
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
//                   {userData.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{userData.email} </p>
//               </div>
//             </div>
//           </div>

//           <div className="px-2 py-2 space-y-1">
//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 text-gray-600  dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
//               <FiGlobe className="w-5 h-5" />
//               <span className="font-medium">Language</span>
//             </button>
//           </div>

//           <div className="px-2 py-2 mt-2 border-t border-gray-200 dark:border-gray-700">
//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-blue-600 dark:text-blue-400">
//               <FiEdit3 className="w-5 h-5" />
//               <span className="font-medium">Edit Profile</span>
//             </button>

//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400">
//               <FiSettings className="w-5 h-5" />
//               <span className="font-medium">Account Settings</span>
//             </button>

//             <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-red-600 dark:text-red-400" onClick={handleSignOut}>
//               <FiLogOut className="w-5 h-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

import { useState, useEffect, useRef, MouseEvent, KeyboardEvent } from "react";
import { FiGlobe, FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  profileImage: string;
  created: string;
  role?: string;
  organization?: string;
}

interface UserProfileProps {
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside as EventListener);
    document.addEventListener("keydown", handleEscKey as EventListener);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
      document.removeEventListener("keydown", handleEscKey as EventListener);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth"); // Redirect after logout
  };

  const handleDropdownToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src =
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
        aria-label="Open account menu"
      >
        <img
          src={userData.profileImage}
          alt="Profile"
          onError={handleImageError}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
          loading="lazy"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">{userData.email}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl py-4 transition-all duration-300 ease-in-out transform ${
            isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"
          } dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={userData.profileImage}
                alt="Profile"
                onError={handleImageError}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {userData.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{userData.email} </p>
              </div>
            </div>
          </div>

          <div className="px-2 py-2 space-y-1">
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 text-gray-600  dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
              <FiGlobe className="w-5 h-5" />
              <span className="font-medium">Language</span>
            </button>
          </div>

          <div className="px-2 py-2 mt-2 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-blue-600 dark:text-blue-400">
              <FiEdit3 className="w-5 h-5" />
              <span className="font-medium">Edit Profile</span>
            </button>

            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400">
              <FiSettings className="w-5 h-5" />
              <span className="font-medium">Account Settings</span>
            </button>

            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-red-600 dark:text-red-400" onClick={handleSignOut}>
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;