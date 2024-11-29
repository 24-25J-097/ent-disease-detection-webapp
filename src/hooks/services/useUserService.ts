import useSWR from 'swr';
import {useCallback, useEffect} from 'react';
import {User} from "@/models/User";
import {useDispatch} from "react-redux";
import {clearUserSession, setRole, setUser} from "@/store/reducers/authSlice";
import {AuthService} from "@/services/AuthService";

export const useUserService = () => {

    const dispatch = useDispatch();

    const fetchUser = useCallback(async () => {
        try {
            const response = await AuthService.getOwnUser();
            return response.data;
        } catch (error) {
            throw error;
        }
    }, []);

    const {data: userData, error, mutate} = useSWR<User>('/auth/user', fetchUser, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const user = userData ? userData["user"] : null;

    const refreshUser = useCallback(() => {
        return mutate();
    }, [mutate]);

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
            dispatch(setRole(user.role));
        } else if (error) {
            dispatch(clearUserSession());
        }
    }, [user, error, dispatch]);

    return {
        user,
        refreshUser,
    };
};
