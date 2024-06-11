import IconArrowDown from "./IconArrowDown";
import { useState } from "react";
import Login from "../pages/Login";
import IconPerson from "./IconPerson";
import IconDistance from "./IconDistance";
import IconReloj from "./IconReloj";

const Header = () => {
    const [openLogin, setOpenLogin]= useState(false)
  return (
    <div className="relative">
     
     
      <IconPerson className="absolute right-12 top-8 fill-white cursor-pointer" onClick={()=> setOpenLogin(!openLogin)}/>
      {
        openLogin && <Login/>
      }

      <div className=" bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-800  flex md:flex-row flex-col gap-1 py-32 justify-center ">

        <div className=" text-white font-bold uppercase md:text-4xl text-2xl flex flex-col items-center justify-center md:mt-0 mt-10">
          <div className="flex flex-col gap-4 items-center justify-center">
            <span className="md:text-5xl text-center text-yellow-500 ">
              Catálogo de Hamburguesas
            </span>

            <h1 className="tracking-wider md:text-3xl text-xl">Urban Burger</h1>
          </div>
          <IconArrowDown className="animate-bounce fill-white mt-8 md:size-14 " />
        </div>
      </div>

      <div>
        <h1 className="text-4xl uppercase font-bold tracking-wider ml-10 my-8">
          Urban Burger
        </h1>
        <div className="flex mx-10 gap-2  mb-4 ">
          <IconDistance />
          <span>Abierto</span>
          <IconReloj/>
          <span>6PM - 10PM</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
