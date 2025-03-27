'use client'

import { Button } from "./ui/button";

export function SignOutButton() {    
    return (
        <div>
            <div>
                <Button variant="ghost" className="w-full p-0"
                    onClick={async () => {
                        // @ts-ignore
                        window.location.href = `https://next-auth-okta-chi.vercel.app/api/auth/federated-logout`;
                    }
                    }
                >
                    Sign Out
                </Button>
            </div>
        </div>
    )
}