import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import Footer from "./components/Footer.js";
import Error from "./components/Error.js";
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

const AppLayout = () =>{
    return (
        <>
          <Header />
          {/* {Outlet - All children go into outlet} */}
          <Outlet />
          <Footer />
        </>
    );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/restaurants/:resid",
        element: <RestaurantMenu />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);


/*
            Header
              -Logo
              -Nav Items(Right Side)
              -Cart
            Body
              -Search Bar
              -Restaurant List
                -Restaurant Card (many cards)
                   -Image
                   -Name
                   -Rating
                   -Cuisine
            Footer
              -Links
              -Copyright
*/


// const heading = React.createElement("h1",{
//     id: "head1",
//     key: "h1",
//     style: {
//         background:"green",
//     },
//     className:"title"
// },"Hello Everyone Howdy!");

// const heading2 = React.createElement("h2",{
//     id: "head2",
//     key: "h2",
//     style: {
//         background:"red",
//     },
//     className:"title"
// },"Hello Everyone!");

// const heading3 = (
//     <h1 id="title3" key={2016}>
//         Namaste
//     </h1>
// );

// const container = React.createElement("div",{
//     id: "container",
//     style: {
//         background:"black",
//     },
//     className: "container"
// },[heading,heading2]);

// //Functional Component
// const Title_func = ()=>{
//     return <h1>Hello I am in functional component title</h1>;
// };

// const HeaderComponent = ()=>{
//     return( 
//     <div>
//         {heading3}
//         <Title_func />  
//         {/* or we can use {Title_func()} */}
//         <h1>Hello I am in functional component1</h1>
//         <h2>Hello I am in functional component2</h2>
//     </div>
//     );
// };