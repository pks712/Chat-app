import React from 'react';
import Search from './search';
import Users from './Users';
import Logout from '../left1/Logout.jsx';

const Left = () => {
  return (
    <div className="w-full lg:w-[30%] bg-black text-white h-full flex flex-col">

      {/* 🔼 Header */}
      <div className="px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Chats</h1>

        {/* 🍔 Mobile hamburger inside header */}
        <div className="lg:hidden">
          <Logout /> {/* ✅ for mobile hamburger */}
        </div>
      </div>

      {/* 🔍 Search */}
      <Search />
      <hr className="border-gray-600" />

      {/* 🧑 Users list */}
      <div className="flex-1 overflow-y-auto">
        <Users />
      </div>
    </div>
  );
};

export default Left;
