"use client"
import { useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { FaHouseChimney } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

export default function Home() {

  const router = useRouter();

  const handleSettings = () => {

    if(window.electronAPI){
      window.electronAPI.openSettingWindow();
      router.push("/settings");
    }
  };

  const handleHome = () => {
    if(window.electronAPI){
      window.electronAPI.openHomeWindow();
      router.push("/Home");
    }
  }

  return (
    <div>
      <h1>Electron + Next.js</h1>
      <button onClick={handleHome}><FaHouseChimney size={24} />Home Page</button>
      <button onClick={handleSettings}><IoSettings size={24} />Setting Page</button>
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
