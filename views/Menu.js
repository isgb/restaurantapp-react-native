import React, {Fragment, useContext, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Container,
         Separator, 
         Content, 
         List,
         ListItem,
         Thumbnail,
         Text,
         Left,
         Body
} from 'native-base' 

import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';

import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {

  // context de firebase
  const { menu, obtenerProductos } = useContext(FirebaseContext);

  // Context de pedido
  const { seleccionarPlatillo } = useContext(PedidoContext);

  //Hook para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  }, []);
  
  const mostrarHeading = (categoria,i) => {

    const categoriaAnterior = menu[i - 1].categoria;

    if(i > 0){
      if(categoriaAnterior !== categoria){
        return (
          <Separator styles={styles.separador}>
            <Text style={styles.separadorTexto}>
              {categoria}
            </Text>
          </Separator>
        )
      }
    }else{
      return(
        <Separator styles={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </Separator>
      )
    }

  }

  return (
    <Container style={globalStyles.container}>
      <Content style={{ backgroundColor: '#FFF'}}>
        <List>
          {menu.map( (platillo,i) =>{
            const { imagen, nombre, descripcion, precio,categoria, id} = platillo;

            return (
              <Fragment key={id}>
                {mostrarHeading(categoria,i)}
                <ListItem
                  onPress={() => {

                    //Eliminar algunas propiedades
                    const { existencia, ...platillo2 } = platillo;

                    seleccionarPlatillo(platillo2)
                    navigation.navigate('DetallePlatillo');
                  }}
                >
                
                    <Thumbnail large square source={{ uri: imagen}}/>
                 
                  <Body>
                    <Text>{nombre}</Text>
                    <Text
                      note
                      numberOfLines={2}
                    >
                      {descripcion}
                    </Text>

                    <Text>Precio: $ {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            )

            })}
        </List>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  separador:{
    backgroundColor:'#000',
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default Menu