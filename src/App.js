import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Notification from './components/UI/Notification';
import {sendCartData, fetchCartData} from './store/cart-actions.js'

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  //Second method to handle asynchronous and side effect code (with action creator)
  useEffect(() => {

    if(isInitial) {
      isInitial = false;
      return;
    }
if(cart.changed) {
  dispatch(sendCartData(cart))
}
   
  }, [cart, dispatch])

  //First method to handle asynchronous and side effect code (in component with useEffect)
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(uiActions.showNotification({
  //       status:'pending',
  //       title:'Sending...',
  //       message:'Sending cart data!'
  //     }))
  //     const response = await fetch('https://react-cart-b606e-default-rtdb.firebaseio.com/cart.json', {
  //       method: 'PUT',
  //       body: JSON.stringify(cart)
  //     });

  //     if(!response.ok) {
  //       throw new Error('Sending cart data failed.')
  //     }
  //     dispatch(uiActions.showNotification({
  //       status:'success',
  //       title:'Success...',
  //       message:'Sending cart data successfully!'
  //     }))
  //   }


  //   if(isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     dispatch(uiActions.showNotification({
  //       status:'error',
  //       title:'Error!',
  //       message:'Sending cart data failed!'
  //     }))
  //   })

  // }, [cart, dispatch])



  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/> }
        <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
