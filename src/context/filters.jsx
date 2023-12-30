import { createContext, useState } from "react";

// 1. Crear el contexto
//Contexto que hay que consumir
export const FiltersContext = createContext();

//2. Crear el provider para proveer el contexto
//El que nos provee de acceso al contexto
export function Filtersprovider({ children }) {

    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    })
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}