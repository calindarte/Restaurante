import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import Home from "../pages/Home";
import LayoutOrder from "../layout/LayoutOrder";
import ProductDetails from "../pages/OrderDetails";
import OrderConfirm from "../pages/OrderConfirm";
import LayoutPrivate from "../layout/LayoutPrivate";
import Admin from "../pages/Admin";
import LayoutRoot from "../layout/LayoutRoot";

export const router = createBrowserRouter([

    {
        path:"/",
        element:<LayoutRoot/>,
        children:[
            {
                path:"/",
                element: <LayoutPublic/>,
                children: [
                    {
                        index:true,
                        element: <Home/>,
                    },
                    {
                        path:"/order",
                        element:<LayoutOrder/>,
                        children:[
                        {
                            index:true,
                            element:<ProductDetails/>
                        },
                        {
                            path:"/order/confirm",
                            element:<OrderConfirm/>,
                        },
        
                        ]
                    },
                
                    
                ]
                
            },
            {
                path:"/admin",
                element:<LayoutPrivate/>,
                children: [
                    {
                        index: true,
                        element:<Admin/>
                    }
                ]
            }
        ]
        
    },
    
])