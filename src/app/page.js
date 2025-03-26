"use client"
import { motion, AnimatePresence } from "framer-motion";
import { FaAlignJustify, FaHouseChimney } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import Home from "../pages/home";
import Settings from "../pages/settings"
import { useState } from "react";

export default function Page() {
  const [activePage, setActivePage] = useState("home");

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  // Animation variants for sliding effect
  const pageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  // const router = useRouter();

  // const handleSettings = () => {
  //   // if (window.electronAPI) {
  //     // window.electronAPI.openSettingWindow();
  //     router.push("/settings");
  //   // }
  // };

  // const handleHome = () => {
  //   // if (window.electronAPI) {
  //     // window.electronAPI.openHomeWindow();
  //     router.push("/home");
  //   // }
  // }

  return (
    <div className="main-container">
      {/* Fixed Sidebar Icons */}
      <div className="icon-container">
        {<button className="btn btn-sidebar"><FaAlignJustify size={24} /></button> ? <>
          <button className="btn btn-sidebar"><FaAlignJustify size={24} /></button>
          <button className="btn btn-homebar" onClick={() => handleNavigation("home")}>
            <FaHouseChimney size={24} />
          </button>
          <button className="btn btn-settingbar" onClick={() => handleNavigation("settings")}>
            <IoSettings size={24} />
          </button></> : null}
      </div>

      {/* Animated Page Content */}
      <div className="content-container">
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Home />
            </motion.div>
          )}
          {activePage === "settings" && (
            <motion.div key="settings" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Settings />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// return (
//   <div>
//     <h1>Electron + Next.js</h1>
//     <div className="container">
//       <button className="btn btn-sidebar">
//         <FaAlignJustify size={24} />
//       </button>
//       <button className="btn btn-homebar" onClick={() => setActivePage("home")}>
//         <FaHouseChimney size={24} />
//       </button>
//       <button className="btn btn-settingbar" onClick={() => setActivePage("settings")}>
//         <IoSettings size={24} />
//       </button>
//     </div>

//     {/* Dynamically Render Content */}
//     <div className="content">
//       {activePage === "home" && <Home />}
//       {activePage === "settings" && <Settings />}
//     </div>
//   </div>
// );

// return (
//   <div>
//     <h1>Electron + Next.js</h1>
//     <div className="container">
//       <button className="btn btn-sidebar"><FaAlignJustify size={24} /></button>
//       <button className="btn btn-homebar" onClick={handleHome}><FaHouseChimney size={24} /></button>
//       <button className="btn btn-settingbar" onClick={handleSettings}><IoSettings size={24} /></button>
//     </div>
//   </div>
// );