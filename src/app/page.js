"use client"
import { useEffect, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { FaHouseChimney } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

export default function Home() {
  const [electronAvailable, setElectronAvailable] = useState(false);

  useEffect(() => {
    if(typeof window !== "undefined" && window.Electron){
      setElectronAvailable(true);
    }
  },[])
  // const [electron, setElectron] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const getElectron = window.require?.("electron");
  //     setElectron(getElectron);
  //   }
  // }, [])

  const handleHome = () => {
    if(window.Electron && window.Electron.ipcRenderer){
      window.Electron.ipcRenderer.send("open-settings");
    } else {
      console.error("ipcRenderer not available");
    }
  };

  return (
    <div>
      <h1>Electron + Next.js</h1>
      <button onClick={handleHome}>Open Second Window</button>
    </div>
    // <section>
    //   <div className="container">
    //     <button className="btn btn-sidebar"><FaAlignJustify size={24} /></button>
    //     <button className="btn btn-home" onClick={handleHome}><FaHouseChimney size={24} /></button>
    //     <button className="btn btn-setting" onClick={handleClick}><IoSettings size={24} /></button>
    //   </div>
    // </section>
  );
}
