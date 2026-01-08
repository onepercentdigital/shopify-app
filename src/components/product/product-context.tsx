import { useSearch } from '@tanstack/react-router';
import type React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
} from 'react';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => ProductState;
  updateImage: (index: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearch({ strict: false }) as
    | Record<string, string>
    | undefined;

  const getInitialState = (): ProductState => {
    if (!searchParams) return {};
    const params: ProductState = {};
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === 'string') {
        params[key] = value;
      }
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update,
    }),
  );

  const updateOption = useCallback(
    (name: string, value: string) => {
      const newState = { [name]: value };
      setOptimisticState(newState);
      return { ...state, ...newState };
    },
    [setOptimisticState, state],
  );

  const updateImage = useCallback(
    (index: string) => {
      const newState = { image: index };
      setOptimisticState(newState);
      return { ...state, ...newState };
    },
    [setOptimisticState, state],
  );

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage,
    }),
    [state, updateOption, updateImage],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function useUpdateURL() {
  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };
}
