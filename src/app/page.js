"use client"
import { motion, AnimatePresence } from "framer-motion";
import { FaAlignJustify, FaHouseChimney } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import Home from "../pages/home";
import Settings from "../pages/settings"
import { useState } from "react";

export default function Page() {
  const [activePage, setActivePage] = useState(null);
  const [sideBar, setSideBar] = useState(false);

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }

  // sidebar animation variants
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
  }

  // Animation variants for sliding effect
  const pageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div className="main-container">
      {/* sidebar toggle button */}
      <button className="btn btn-sidebar" onClick={handleSideBar}>
        <FaAlignJustify size={24} />
      </button>

      {/* animated sidebar */}
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
