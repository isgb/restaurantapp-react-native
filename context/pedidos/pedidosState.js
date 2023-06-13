import React, {useReducer} from "react"; 

import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";

import { SELECCIONAR_PRODUCTO } from "../../types";

const PedidoState = props => {

    // crear state inicial
    const initialState ={
        pedido : [],
        platillo: null
    }

    //useReducer con dispatch para ejecurar las funciones
    const [ state, dispatch ] = useReducer(PedidoReducer, initialState)

    // Selecciona el Producto que el usuario desa ordenar
    const seleccionarPlatillo = (platillo) =>{
        //console.log(platillo)
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    return(
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                seleccionarPlatillo
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidoState