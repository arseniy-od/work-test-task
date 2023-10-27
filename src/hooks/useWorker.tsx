import { useContext } from "react";
import { WorkerContext } from "../context/WorkerContext";


type UseWorkerRes = {
  changeWorkerId: (userId: string) => void
  workerId: string;
}

export function useWorker(): UseWorkerRes {
  const { workerId, setWorkerId } = useContext(WorkerContext);
  const changeWorkerId = (userId: string) => {
    if(setWorkerId) {
        setWorkerId(userId)
    }
  } 

  return { workerId, changeWorkerId };
}
