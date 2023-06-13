import React, {useReducer} from "react"; 

import firebase from "../../firebase";
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import { OBTENER_PRODUCTOS_EXITO } from "../../types";

import _ from 'lodash';

const FirebaseState = props => {


    const initialState ={
        menu : []
    }

    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState)

    const obtenerProductos = () => {
        
        //Consultar firebase
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) // traer solo los que esten en existencia
            .onSnapshot(manejarSnapshot);

            function manejarSnapshot(snapshot){
                let platillos = snapshot.docs.map( doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });

                //Ordenas por categoria con lodash
                platillos = _.sortBy(platillos, 'categoria');
                // console.log(platillos);

                //console.log(platillos);
                // Tenemos resultados de a base de datos
                dispatch({
                    type: OBTENER_PRODUCTOS_EXITO,
                    payload: platillos // payload lo que va a cambiar el state
                });
            }
    }

    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState