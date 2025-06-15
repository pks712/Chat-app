import React from 'react';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Type_Message from './Type-Message';
import useConversation from '../../../statemange/userConversation';
import { useAuth } from '../../../context/AuthProvider'; 
const Right = () => {
  const { selectedConversation } = useConversation();
   const { authuser } = useAuth();
  
  return (
    <div className="w-full lg:w-[70%] bg-slate-950 text-white h-full flex flex-col">
      {selectedConversation ? (
        <>
          <Chatuser />
          <Messages />
          <Type_Message />
        </>
      ) : (
       <div className="flex justify-center items-center h-full text-gray-400 text-xl flex-col">
  <p>Welcome {authuser?.user?.name || "Guest"}</p>


  <p>No user selected...</p>
</div>

      )}
    </div>
  );
};

export default Right;
