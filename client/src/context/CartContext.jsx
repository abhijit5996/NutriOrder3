import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: true,
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
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${user.id}`);
          
          if (response.ok) {
            const cartData = await response.json();
            dispatch({ type: 'LOAD_CART', payload: cartData });
          } else {
            console.error('Failed to load cart from backend');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } catch (error) {
          console.error('Error loading cart from backend:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else if (!user) {
        // If user is not logged in, load from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            dispatch({ type: 'LOAD_CART', payload: parsedCart });
          } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
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
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${user.id}`);
          
          if (!response.ok) {
            // If cart doesn't exist, sync all items individually
            for (const item of state.items) {
              await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${user.id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
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
    }
  }, [state.items, state.totalItems, state.totalAmount, user, state.isLoading]);

  const addItem = async (item) => {
    if (user) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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

        if (response.ok) {
          dispatch({ type: 'ADD_ITEM', payload: item });
          toast.success(`${item.name} added to cart successfully!`, {
            duration: 3000,
            position: 'top-right',
          });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to add item to cart', {
            duration: 3000,
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast.error('Failed to add item to cart', {
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
        await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${user.id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error clearing cart from backend:', error);
      }
    } else {
      localStorage.removeItem('cart');
    }
    
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
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