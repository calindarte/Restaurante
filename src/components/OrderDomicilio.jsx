import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import IconArrowBack from "./IconArrowBack";
import IconDistance from "./IconDistance";
import IconHome from "./IconHome";
import IconPhone from "./IconPhone";
import IconPersona from "./IconPersona";

const OrderDomicilio = ({orderProduct, calculateTotalPrice, historyOrder, setHistoryOrder}) => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [comment, setComment] = useState("");

  const handleSendOrder = () => {

    if (!name || !phone || !address || !neighborhood || !paymentMethod || orderProduct.length === 0) {
      Swal.fire({
          position: "center",
          icon: "error",
          title: "Por favor, complete todos los campos",
          showConfirmButton: false,
          timer: 1500,
      });
      return;
    }
   
    const formattedOrder = orderProduct.map(product => `${product.name} x${product.quantity}`).join(", ");
    const totalPrice = calculateTotalPrice();

    const message = `Hola, me gustaría hacer un domicilio con los siguientes detalles:\n
    Resumen Pedido: ${formattedOrder}\n
    Subtotal: $${totalPrice} COP\n
    Nombres: ${name}\n
    Teléfono: ${phone}\n
    Dirección: ${address}\n
    Barrio: ${neighborhood}\n
    Forma de pago: ${paymentMethod}\n
    Comentario: ${comment}`;

    const phoneNumber = "3015918036"; // Reemplaza este número con el número de WhatsApp específico
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    const newOrder = {
      name,
      phone,
      address,
      neighborhood,
      paymentMethod,
      orderProduct,
      totalPrice,
      timestamp: Date.now(),
    };

    const updatedHistoryOrder = [...historyOrder, newOrder];
    setHistoryOrder(updatedHistoryOrder);
    localStorage.setItem("history", JSON.stringify(updatedHistoryOrder));

  setName("");
  setPhone("");
  setAddress("");
  setNeighborhood("");
  setPaymentMethod("");
  setComment("");
  };

  return (
    <div>
      <form className="flex flex-col gap-4 my-4 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Nombres"
            className="  px-8 py-2 block w-full border border-gray-300 rounded-md shadow-sm "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          

<IconPersona className="absolute top-2 left-1.5"/>
        
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Teléfono"
            className="px-8 py-2 block w-full border border-gray-300 rounded-md shadow-sm "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

<IconPhone className="absolute top-2 left-1.5"/>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Dirección"
            className="px-8 py-2 block w-full border border-gray-300 rounded-md shadow-sm "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

<IconHome className="absolute top-2 left-1.5"/>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Barrio"
            className="px-8 py-2 block w-full border border-gray-300 rounded-md shadow-sm "
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />

<IconDistance className="fill-zinc-900 absolute top-2 left-1.5"/>
        </div>
        <div>

          <select
          
            className="p-2 block w-full border border-gray-300 rounded-md shadow-sm "
            value={paymentMethod}
            
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="" disabled>Seleccione Forma de Pago</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Datafono">Datafono</option>
          </select>
        </div>
        <div>
          <textarea
            className="px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ingrese algun Comentario (Opcional)"
          />
        </div>
        <div className="my-4 text-center text-sm">
        <span>
        Al dar click en enviar, aceptas nuestros Términos y condiciones y las políticas de privacidad.
        </span>

        </div>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="bg-green-600 hover:bg-green-500 w-full py-3 flex items-center justify-center gap-2 rounded-md text-white font-medium"
            onClick={handleSendOrder}
          >
   

            Enviar por WhatsApp
   
          </button>
          <Link to="/order">
                <button className="bg-zinc-900  hover:bg-zinc-700 text-white rounded-md py-4 w-full flex justify-center gap-1">
                <IconArrowBack className="fill-white"/>
                  Volver a la Orden
                </button>
           </Link>
        </div>
      </form>
    </div>
  );
};

export default OrderDomicilio;