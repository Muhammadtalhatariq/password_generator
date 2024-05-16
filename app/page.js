"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

const page = () => {
  const [length, setlength] = useState(8);
  const [allownumber, setallownumber] = useState(false);
  const [allowchar, setallowchar] = useState(false);
  const [password, setpassword] = useState("");

// useRef hook 
  const passwordcopy = useRef(null);

  const passwordcopytoclipboard = useCallback(() => {
    passwordcopy.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

//  useCallback hoook 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allownumber) str += "0123456789";
    if (allowchar) str += "!@#$%^&*{} []-_=+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, allownumber, allowchar, setpassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowchar, allownumber, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md bg-gray-700 mx-auto shadow-md rounded-md px-4 my-8 py-4 absolute top-1/3 left-1/3">
        <h1 className="text-white text-center my-3 text-xl font-bold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordcopy}
          />
          <button
            onClick={passwordcopytoclipboard}
            className="outline-none bg-blue-400 hover:bg-blue-300 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label  className="text-white text-lg font-bold" > length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allownumber}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setallownumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"  className="text-white text-lg font-bold"  >Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowchar}
              id="characterInput"
              className="cursor-pointer"
              onChange={() => {
                
                setallowchar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput"  className="text-white text-lg font-bold" >character</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
