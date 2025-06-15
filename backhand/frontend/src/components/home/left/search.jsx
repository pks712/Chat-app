import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useGetAllUsers from "../../../context/userGetAllUsers.jsx";
import useConversation from "../../../statemange/userConversation.js";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="px-3 py-4">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          {/* Input Box */}
          <input
            className="w-full lg:w-[85%] bg-slate-900 border border-gray-700 rounded-full py-2 pl-4 pr-12 text-white text-sm lg:text-base outline-none"
            type="search"
            required
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Search Icon */}
          <button
            type="submit"
            className="absolute right-4 text-gray-300 hover:text-white"
          >
            <IoSearch className="text-xl lg:text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
