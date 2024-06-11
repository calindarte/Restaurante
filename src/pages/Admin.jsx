import { NavLink } from "react-router-dom";
import { useOrderContext } from "../context/UseOrderContext";

const Admin = () => {

   const {historyOrder, setHistoryOrder} = useOrderContext()

      const handleDeleteOrder = (timestamp) => {
        const updatedHistory = historyOrder.filter(order => order.timestamp !== timestamp);
        setHistoryOrder(updatedHistory);
        localStorage.setItem("history", JSON.stringify(updatedHistory));
      };

  return (
    <div className="px-6">
        <div className="py-6">
        <h1 className="text-center text-xl font-medium">Historial de Pedidos</h1>
        </div>
      <div className="flex justify-around  gap-2  text-white px-2 text-center ">
        <NavLink  className="border bg-blue-900 py-3 w-full rounded-md">Pedidos Realizados</NavLink>
        <NavLink to="/" className="border bg-blue-950 hover:bg-blue-900 py-3 w-full rounded-md ">Volver</NavLink>
        
        
        </div>
    
      <div className="px-4 py-4">

      {historyOrder.length === 0 ? (
          <p className="text-center text-gray-500">No hay pedidos en el historial</p>
        ) : (
          historyOrder.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 shadow-md flex  justify-between items-center">
              <div>
              <h2 className="font-bold">Pedido de {item.name}</h2>
                  <p><strong>Teléfono:</strong> {item.phone}</p>
                  <p><strong>Dirección:</strong> {item.address}</p>
                  <p><strong>Barrio:</strong> {item.neighborhood}</p>
                  <p><strong>Forma de Pago:</strong> {item.paymentMethod}</p>
                  <p><strong>Comentario:</strong> {item.comment}</p>
                  <p><strong>Productos:</strong> {item.orderProduct.map(product => `${product.name} x${product.quantity}`).join(", ")}</p>
                  <p><strong>Subtotal:</strong> ${item.totalPrice} COP</p>
                  <p><strong>Fecha:</strong> {new Date(item.timestamp).toLocaleString()}</p>
              </div>
              <div>
              <button
                className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded"
                onClick={() => handleDeleteOrder(item.timestamp)}
              >
                Eliminar
              </button>
              </div>
            </div>
          ))
        )}
      </div>
      

    </div>
  );
};

export default Admin;
