"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { clientSessionToken } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import evnConfig from "@/config";
import accountApi from "@/apiRequest/account";
import { AccountResType } from "@/SchemaValidations/acount.schema";
import authApi from "@/apiRequest/auth";

interface UserInfo {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!clientSessionToken.value) {

      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await accountApi.meClient();
        if (!res?.payload?.data) {
          throw new Error('Invalid response data');
        }

        const userData: UserInfo = {
          id: res.payload.data.id.toString(),
          name: res.payload.data.name,
          email: res.payload.data.email,
          avatar: '',
        };

        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setUser(null);
      }
    };
    fetchUser();
  }, [clientSessionToken]);

  const clearCookieNextServer = async () => {
    try {
      // const resultFromNextServer = await fetch('/api/auth', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ clientSessionToken: clientSessionToken.value }),
      // });
      const resultFromNextServer = await authApi.auth({ sessionToken: '' });

      if (resultFromNextServer.status !== 200) throw new Error('Failed to clear cookie');
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogout = () => {
    clearCookieNextServer();
    router.push("/login");
  };

  if (!clientSessionToken.value) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
          {user?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={user.name || "User"}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-xs font-medium uppercase">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 pt-1 pb-2 text-sm">
          <p className="font-medium truncate">
            {user?.name || user?.email || "User"}
          </p>
          {user?.email && (
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/me" className="flex items-center gap-2">
            <User className="size-4" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="size-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
