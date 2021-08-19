import React from "react";
import { Accounts, Books, Login, Dashboard, ManagePosts, ManageUsers } from "./pages";

// File này có thể ko cần dùng tới

const routes = {
    "/": () => <Login />,
    "/accounts": () => <Accounts />,
    "/books": () => <Books />
};


// export const roleRoutes = {
//     ADMIN: [
//         {
//             path: '/Dashboard',
//             exact: false,
//             component: Dashboard
//         },
//         {
//             path: '/manage-posts',
//             exact: false,
//             component: ManagePosts
//         },
//         {
//             path: '/manage-users',
//             exact: false,
//             component: ManageUsers
//         },

//     ],
//     USER: [
//         {
//             path: '/',
//             exact: true,
//             component: Login
//         }
//     ],
// }


export default routes;
// export default roleRoutes;
