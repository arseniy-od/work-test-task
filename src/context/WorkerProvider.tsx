import { ReactNode, useState} from 'react';
import {WorkerContext} from './WorkerContext';


export default function WorkerProvider({children}: {children: ReactNode}) {
    const [workerId, setWorkerId] = useState('');

    return (
        <WorkerContext.Provider
            value={{
                workerId: workerId,
                setWorkerId: setWorkerId,
            }}>
                {children}
            </WorkerContext.Provider>
    );
};

