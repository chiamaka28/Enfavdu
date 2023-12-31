import React, { useState } from "react";
import { Link } from "react-router-dom";


const ConfirmEmail = ({form, setForm, handleEmail}) => {
  
  return (
    <div className="h-[100%] flex justify-center">
      <div className="bg-white h-[50%] md:h-[65%] w-[90%] max-w-[400px] flex flex-col justify-center md:gap-y-5 my-auto text-center py-12 px-3 rounded-lg shadow-xl">
        <div>
            <h4 className="text-[20px]  md:text-[25px] font-bold">Reset Password</h4>
            <p>Enter your email for a password reset link.</p>
            <div className="py-5 flex flex-col items-start">
                <input 
                type="text" 
                placeholder="Email ,phone & username" 
                className="w-[100%] mx-auto py-2 px-4 rounded-md border-gray border-[1px]"
                value={form.adminEmail} 
                onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}/>
                <div  className="text-blue">
                    <Link>Forgot Email?</Link>
                </div>
            </div>
        </div>
        <div>
            <div><button  onClick={handleEmail} className="bg-blue text-white py-2 px-8 rounded-md">Send Reset Link</button></div>
            <Link to="/login" className="text-blue text-sm">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
