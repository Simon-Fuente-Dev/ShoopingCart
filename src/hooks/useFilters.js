import { useContext } from 'react';
import { FiltersContext } from '../context/filters.jsx'

export function useFilters() {

    const { filters, setFilters } = useContext(FiltersContext);

    //Metodo que peremite filtrar segun el filtro que tengamos
    const filterProducts = (products) => {
        //Filtramos los productos que cumplan estas 2 condiciones
        return products.filter(product => {
            return (
                //Condicion 1: que el precio del producto sea mayor al precio minimo del filtro
                product.price >= filters.minPrice &&
                (
                    //Condicion 2: mirar si la categoria del filtro es all, pero si no es all
                    // mostramos los productos que tengan la misma categoria que el filtro
                    filters.category == 'all' ||
                    product.category == filters.category
                )
            )
        })
    };

    return { filters, filterProducts, setFilters }
};