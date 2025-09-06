import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';
import { endpoints, apiRequest } from '../config/api';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: true,
  orders: [], // Add orders to initial state
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
      
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        totalAmount: action.payload.totalAmount || 0,
        isLoading: false,
      };

    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + (action.payload.price * action.payload.quantity),
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + (action.payload.price * action.payload.quantity),
        };
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);

      if (itemIndex === -1) return state;

      const item = state.items[itemIndex];
      const quantityDifference = quantity - item.quantity;
      const updatedItems = [...state.items];
      
      updatedItems[itemIndex] = {
        ...item,
        quantity,
      };

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalAmount: state.totalAmount + (item.price * quantityDifference),
      };
    }

    case 'REMOVE_ITEM': {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) return state;

      return {
        ...state,
        items: state.items.filter(item => item.id !== id),
        totalItems: state.totalItems - existingItem.quantity,
        totalAmount: state.totalAmount - (existingItem.price * existingItem.quantity),
      };
    }

    case 'CLEAR_CART':
      return {
        ...initialState,
        isLoading: false,
        orders: state.orders, // Keep orders when clearing cart
      };

    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case 'LOAD_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isLoaded } = useUser();

  // Load cart from backend when user logs in
  useEffect(() => {
    const loadCartFromBackend = async () => {
      if (isLoaded && user) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          const cartData = await apiRequest(endpoints.cart.get(user.id), {
            credentials: 'include',
          });
          dispatch({ type: 'LOAD_CART', payload: cartData });
        } catch (error) {
          console.error('Error loading cart from backend:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else if (!user) {
        // If user is not logged in, load from localStorage
        const savedCart = localStorage.getItem('cart');
        const savedOrders = localStorage.getItem('orders');
        
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            dispatch({ type: 'LOAD_CART', payload: parsedCart });
          } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
          }
        }
        
        if (savedOrders) {
          try {
            const parsedOrders = JSON.parse(savedOrders);
            dispatch({ type: 'LOAD_ORDERS', payload: parsedOrders });
          } catch (error) {
            console.error('Failed to parse orders from localStorage:', error);
          }
        }
        
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCartFromBackend();
  }, [user, isLoaded]);

  // Sync cart to backend when user is logged in
  useEffect(() => {
    const syncCartToBackend = async () => {
      if (user && !state.isLoading) {
        try {
          // First check if cart exists
          try {
            await apiRequest(endpoints.cart.get(user.id), {
              credentials: 'include',
            });
          } catch (error) {
            // If cart doesn't exist, sync all items individually
            for (const item of state.items) {
              await apiRequest(endpoints.cart.add(user.id), {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                  restaurantId: item.restaurantId,
                  restaurantName: item.restaurantName
                }),
              });
            }
          }
        } catch (error) {
          console.error('Error syncing cart to backend:', error);
        }
      }
    };

    if (!state.isLoading) {
      syncCartToBackend();
    }
  }, [state.items, user, state.isLoading]);

  // Save to localStorage when user is not logged in
  useEffect(() => {
    if (!user && !state.isLoading) {
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      }));
      
      localStorage.setItem('orders', JSON.stringify(state.orders));
    }
  }, [state.items, state.totalItems, state.totalAmount, state.orders, user, state.isLoading]);

  const addItem = async (item) => {
    if (user) {
      try {
        await apiRequest(endpoints.cart.add(user.id), {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName
          }),
        });

        dispatch({ type: 'ADD_ITEM', payload: item });
        toast.success(`${item.name} added to cart successfully!`, {
          duration: 3000,
          position: 'top-right',
        });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast.error(error.message || 'Failed to add item to cart', {
          duration: 3000,
          position: 'top-right',
        });
      }
    } else {
      // If user is not logged in, just update local state
      dispatch({ type: 'ADD_ITEM', payload: item });
      toast.success(`${item.name} added to cart successfully!`, {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const updateQuantity = async (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = async (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = async () => {
    if (user) {
      try {
        await apiRequest(endpoints.cart.clear(user.id), {
          method: 'DELETE',
          credentials: 'include',
        });
      } catch (error) {
        console.error('Error clearing cart from backend:', error);
      }
    } else {
      localStorage.removeItem('cart');
    }
    
    dispatch({ type: 'CLEAR_CART' });
  };

  const placeOrder = async (orderDetails = {}) => {
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...state.items],
      totalAmount: state.totalAmount,
      status: 'pending',
      ...orderDetails
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    
    // Clear the cart after placing order
    await clearCart();
    
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        placeOrder, // Add placeOrder function to context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};