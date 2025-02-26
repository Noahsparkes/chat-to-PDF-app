import UserProfile from "@/components/ui/UserProfile";

function Header({userData}:{ userData: userData}) {
  return (
    <header className="w-full bg-gray-800 p-4 shadow-md flex justify-between items-center">
      <UserProfile userData={userData} />
      {/* Add any other header content here */}
    </header>
  );
}

export default Header;


