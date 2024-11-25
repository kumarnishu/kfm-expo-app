import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { UserContext } from "./UserContext";
import { GetProfile } from "../services/UserServices";
import { GetUserDto } from "@/dto";
import { BackendError } from "..";

function useRemoteLoading() {
    const [user, setUser] = useState<GetUserDto | null>(null)
    const { data, isSuccess, isLoading, isError } = useQuery<AxiosResponse<GetUserDto>, BackendError>("profile", GetProfile)

    useEffect(() => {
        if (isSuccess && data)
            setUser(data.data)
    }, [isSuccess, data])

    return { remoteUser: user, remoteLoading: isLoading, isError: isError }
}

// usercontext
type Context = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};
export const LoadingContext = createContext<Context>({
    loading: true,
    setLoading: () => null,
});


// user provider
export function LoadingProvider(props: { children: JSX.Element }) {
    const { remoteUser, remoteLoading, isError } = useRemoteLoading()
    const [loading, setLoading] = useState(remoteLoading);
    const { user,setUser } = useContext(UserContext)

    useEffect(() => {
        if (remoteUser) {
            setLoading(false)
            setUser(remoteUser)
        }
        if (isError) {
            setLoading(false)
            setUser(undefined)
        }
    }, [remoteUser, isError])
    
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {props.children}
        </LoadingContext.Provider>
    );
}