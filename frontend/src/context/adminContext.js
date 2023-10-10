//Imports
import { createContext, useState } from "react";

export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
    //Guardar info del usuario
    const [admin, setAdmin] = useState('');
    return (
        <AdminContext.Provider value={{ setAdmin, admin }}>
            {children}
        </AdminContext.Provider>
    )
}