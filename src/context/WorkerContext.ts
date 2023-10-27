import {Dispatch, createContext} from 'react';

export interface UserContextProps {
    workerId: string;
    setWorkerId?: Dispatch<React.SetStateAction<string>>;
}

export const WorkerContext = createContext<UserContextProps>({
    workerId: '',
});
