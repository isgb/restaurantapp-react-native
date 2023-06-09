import React, {useContext, useEffect} from 'react'
import { Text } from 'react-native/types'
import FirebaseContext from '../context/firebase/firebaseContext'

const Menu = () => {

  // context de firebase
  const { menu, obtenerProductos } = useContext(FirebaseContext);

  useEffect(() => {
    obtenerProductos();
  }, [])
  

  return (
    <Text>Menu</Text>
  )
}

export default Menu