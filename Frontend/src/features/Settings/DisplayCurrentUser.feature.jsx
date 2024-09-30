import { useState } from "react";
import { useGlobalState } from "../../app/global_store";

function DisplayCurrentUser() {
  const {
    user_info: { user },
  } = useGlobalState();

  return (
    <div className=" px-2 py-3 my-3 rounded-[16px]">
      <div className="max-w-[400px] ">
        <div className="text-xl font-bold  pl-10 ">Current User</div>
        <div className="flex flex-col text-lg pl-16 my-3">
          <div className="flex justify-between gap-2">
            <span className="font-semibold"> Name</span> <span>{user.name}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="font-semibold">Username</span> <span>{user.preferred_username}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="font-semibold">Email</span> <span>{user.email}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="font-semibold"> Email Verification</span> <span>{user.email_verified ? "True" : "False"}</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default DisplayCurrentUser;
