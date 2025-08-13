"use client"
import { useEffect } from "react";
import { FaSun,FaMoon } from "react-icons/fa";

export default function Header({setActiveTab,darkMode,setDarkMode,lang,setLang,t}) {
  return (
    <header 
    className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
>
        <div className="display: flex justify-center gap-2 pt-2 pb-2">
            <button 
            onClick={() => setActiveTab("tuketim")}
            type="button" 
            className={` focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 uppercase
            ${
                darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600 text-white " : "bg-gray-200 text-black hover:bg-gray-300 hover:text-black"
            }`}>
                {t.consumption}
            </button>
<button 
onClick={() => setActiveTab("ayarlar")}
type="button" 
  className={` focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 uppercase
            ${
                darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600 text-white " : "bg-gray-200 text-black hover:bg-gray-300 hover:text-black"
            }`}>
    {t.settings}
    </button>
          <button
          onClick={() => setDarkMode(!darkMode)}
           className={`px-5 py-2.5 me-2 mb-2 rounded font-medium ${
            darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}

        </button>
          <button
          onClick={() => setLang(lang === "tr" ? "en" : "tr")}
           className={`px-5 py-2.5 me-2 mb-2 rounded font-medium ${
            darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {lang.toUpperCase()}
        </button>
        </div>
    </header>
  );
}