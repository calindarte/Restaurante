import { useEffect, useState } from "react";
import IconSearch from "../components/IconSearch";
import CardBurger from "../components/CardBurger";
import { useData } from "../hooks/useData";
import { Link } from "react-router-dom";
import { useOrderContext } from "../context/UseOrderContext";
import Price from "../components/Price";
import IconKeyboardArrow from "../components/IconKeyboardArrow";

const Home = () => {
  const [textInput, setTextInput] = useState("");
  const { data, filteredBurgers, addtional, drinks } = useData();
  const { calculateTotalPrice, orderProduct, totalQuantityProduct } =
    useOrderContext();

  const [openAdditional, setOpenAdditional] = useState(false);
  const [openDrinks, setOpenDrinks] = useState(false);


  useEffect(() => {
    filteredBurgers(textInput);
  }, [textInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sumit");
  };

  return (
    <>
      <div className="px-10 pb-4 ">
        <form className="flex items-center " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Buscar..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="relative w-full pl-10 py-2 border border-zinc-400  rounded-full focus:outline-none  focus:ring-1 focus:ring-zinc-800"
          />
          <div className="bg-zinc-950 absolute rounded-full p-1 left-11">
            <IconSearch className="fill-white  " />
          </div>
        </form>
      </div>

      <div className="mx-10 bg-slate-50 text-white flex flex-col gap-1">
        <p className="py-4  items-center font-bold uppercase bg-zinc-950 rounded-md flex justify-center gap-2 ">
          <span>Burgers</span>
        </p>

        {data.map((item) => (
          <div key={item.id} className="flex flex-col">
            <CardBurger
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
              product={item}
            />
          </div>
        ))}
      </div>

      <div className="mx-10 my-4 bg-slate-50 text-white flex flex-col gap-1">
        <button
          onClick={() => setOpenAdditional(!openAdditional)}
          className="py-4 font-bold uppercase bg-zinc-950 rounded-md hover:bg-zinc-900 flex justify-center items-center gap-2 "
        >
          <span>Adicionales</span>
          <IconKeyboardArrow className="fill-white"/>
        </button>
        {openAdditional &&
          addtional.map((item) => (
            <div key={item.id} className="flex flex-col">
              <CardBurger
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                product={item}
              />
            </div>
          ))}
      </div>
      
      <div className="mx-10 my-4 bg-slate-50 text-white flex flex-col gap-1">
        <button
          onClick={() => setOpenDrinks(!openDrinks)}
          className="py-4 font-bold uppercase bg-zinc-950 rounded-md hover:bg-zinc-900 flex justify-center items-center gap-2 "
        >
          <span>Bebidas</span>
          <IconKeyboardArrow className="fill-white"/>
        </button>
        {openDrinks &&
          drinks.map((item) => (
            <div key={item.id} className="flex flex-col">
              <CardBurger
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                product={item}
              />
            </div>
          ))}
      </div>

      {orderProduct.length !== 0 && (
        <Link to={`/order`}>
          <div className="sticky bottom-2 left-0 right-0 text-white z-10 mx-10 py-4 font-bold uppercase bg-zinc-950 hover:bg-zinc-800 rounded-md flex items-center justify-between  my-4 px-10 ">
            <div>{totalQuantityProduct}</div>

            <div className="flex items-center gap-2">
              <span>Ver Orden</span>
            </div>

            <span>
              <Price precio={calculateTotalPrice()} className="text-white" />
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default Home;