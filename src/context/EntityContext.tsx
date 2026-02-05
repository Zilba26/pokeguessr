import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { Entity } from '../models/Entity';
import { EntityService } from '../service/EntityService';

export const createEntityContext = <T extends Entity>() => {
  const Context = createContext<T[] | null>(null);

  const useData = (): T[] => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useData doit être utilisé à l\'intérieur d\'un EntityProvider');
    }
    return context;
  };

  interface EntityProviderProps extends PropsWithChildren {
    service: EntityService<T>;
  }

  const Provider = ({ children, service }: EntityProviderProps) => {
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const entities = await service.getAll();
        setData(entities);
        console.log('Data fetched:', entities.length, 'entities');
      };
      if (data.length === 0) fetchData();
    }, [data, service]);

    return <Context.Provider value={data}>{children}</Context.Provider>;
  };

  return { Provider, useData };
};
