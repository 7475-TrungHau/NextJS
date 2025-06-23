'use client'

import evnConfig from "@/config";
import { useAppContext } from "@/providers/app-provider";
import { useEffect, useState } from "react";

export default function Profile() {
    const { sessionToken } = useAppContext();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
       try {
        const fetchProfile = async () => {
            const result = await fetch (
                `${evnConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionToken}`
                    }
                }
            ).then(async (res) => {
                const payload = await res.json();
                const data = {
                    status: res.status,
                    data: payload
                };
                if (!res.ok || payload.statusCodes === 401){
                    throw payload;
                }
                return data;
            });
            if (result) {
                setUser(result.data.data);
            }
        }
        if (sessionToken !== '') {
            fetchProfile();
        }
       } catch (error) {
           console.log(error);
       }
    }, [sessionToken]);

    return (
        <div className="profile-container max-w-xl mx-auto my-5 p-5 border rounded-lg shadow-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
        <h1 className="text-center mb-5 text-gray-900 dark:text-gray-100 text-2xl font-semibold">Profile</h1>
        {user && (
            <div className="flex flex-col gap-3 text-base text-gray-700 dark:text-gray-300">
                <div>
                    <strong>ID:</strong> {user?.id || 'Chưa có dữ liệu'}
                </div>
                <div>
                    <strong>Email:</strong> {user?.email || 'Chưa có dữ liệu'}
                </div>
                <div>
                    <strong>Name:</strong> {user?.name || 'Chưa có dữ liệu'}
                </div>
            </div>
        )}
    </div>
    )
}