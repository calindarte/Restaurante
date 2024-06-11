import { useState } from "react";
import OrderDomicilio from "../components/OrderDomicilio";
import { useOrderContext } from "../context/UseOrderContext";

const OrderConfirm = () => {

    const [selectedOption, setSelectedOption] = useState("domicilio");
    const { orderProduct,calculateTotalPrice, historyOrder, setHistoryOrder } =
    useOrderContext();


    const handleSelection = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="mx-10">
            <div className="flex flex-col gap-4 ">
            <h1 className="tracking-wider font-bold  uppercase md:text-2xl text-xl text-center">Confirmando Orden</h1>
            <span className=" md:text-2xl text-lg">Seleccione forma de entrega</span>
            </div>

            <div className="flex md:flex-row flex-col justify-center md:gap-16 gap-8 my-8 text-white">
               
                <button
                    className={` px-32 py-2 rounded-2xl shadow-lg hover:bg-zinc-800 ${selectedOption === 'domicilio' ? "bg-zinc-950":"bg-zinc-600"}`}
                    onClick={() => handleSelection('domicilio')}
                >
                   Domicilio
                </button>
            </div>

            {selectedOption === 'domicilio' && <OrderDomicilio orderProduct={orderProduct} calculateTotalPrice={calculateTotalPrice} historyOrder={historyOrder} setHistoryOrder={setHistoryOrder}/>}
        </div>
    );
};

export default OrderConfirm;