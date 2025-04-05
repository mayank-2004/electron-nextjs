"use client"
import { motion, AnimatePresence } from "framer-motion";
import { FaAlignJustify, FaHouseChimney } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import Home from "../pages/home";
import Settings from "../pages/settings"
import { useState } from "react";

export default function Page() {
  const [activePage, setActivePage] = useState("");
  const [sideBar, setSideBar] = useState(false);

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
  }

  const pageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div className="main-container">
      <button className="btn btn-sidebar" onClick={handleSideBar}>
        <FaAlignJustify size={24} />
      </button>

      <AnimatePresence>
        {sideBar && (
          <motion.div
            className="sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button className="btn btn-homebar" onClick={() => handleNavigation("home")}>
              <FaHouseChimney size={24} />
            </button>
            <button className="btn btn-settingbar" onClick={() => handleNavigation("settings")}>
              <IoSettings size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
