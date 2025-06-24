import evnConfig from "@/config";
import { cookies } from "next/headers";
import Profile from "./profile";
import accountApi from "@/apiRequest/account";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    if (!sessionToken) {
        throw new Error('Unauthorized: No session token found');
    } else {
        const result = await accountApi.me(sessionToken ?? '');
    }

    return (
        <div>
            <h1>Profile</h1>
            <Profile />
        </div>
    )
}