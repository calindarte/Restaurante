import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UseOrderContext = createContext();

const inicialState = JSON.parse(localStorage.getItem("order")) || [];
const historyinicialState = JSON.parse(localStorage.getItem("history")) || [];



export default function UseOrderContextProvider ({children}) {
    const [user, setUser] = useState(false);
    const [historyOrder,setHistoryOrder]= useState(historyinicialState);

    const [orderProduct, setOrderProduct] = useState(inicialState);

    useEffect(()=> {
        console.log('useEffect en accion')
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            
            setUser(user)
        })
        return unsubscribe;
    }, [])

    useEffect(() => {
      localStorage.setItem("order", JSON.stringify(orderProduct));
    }, [orderProduct]);

    useEffect(() => {
      localStorage.setItem("history", JSON.stringify(historyOrder));
    }, [historyOrder]);

      const addOrderProduct = (product) => {
        // Verifica si el producto ya está en el carrito
        const productInCart = orderProduct.find((item) => item.id === product.id);
    
        if (productInCart) {
          // Actualiza la cantidad si ya está en el carrito
          setOrderProduct((prevCart) =>
            prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            )
          );
        } else {
          // Agrega el producto al carrito si no está presente
          setOrderProduct((prevCart) => [...prevCart, product]);
        }
        localStorage.setItem("order", JSON.stringify(orderProduct));
        // Devuelve true si se agregó correctamente
        return true;
       
      };
    
      const deleteOrderProduct = (id) => {
        setOrderProduct(orderProduct.filter((item) => item.id !== id));
        localStorage.setItem("order", JSON.stringify(orderProduct));
      };
    
      const calculateTotalPrice = () => {
        const totalPrice = orderProduct.reduce(
          (acc, current) => acc + current.quantity * current.price,
          0
        );
        return totalPrice;
      };
    
      const totalQuantityProduct = orderProduct.reduce(
        (acc, current) => current.quantity + acc,
        0
      );


 


      return (
        <UseOrderContext.Provider
          value={{
            orderProduct,
            addOrderProduct,
            deleteOrderProduct,
            totalQuantityProduct,
            calculateTotalPrice,
            user,
            historyOrder,
            setHistoryOrder,
          }}
        >
          {children}
        </UseOrderContext.Provider>
      );
    }
    
    
    export const useOrderContext = () => useContext(UseOrderContext);