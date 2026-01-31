import { signOut } from "../../src/auth"
import { Button } from "./ui/button"

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({ 
                    redirectTo: "/",
                });
            }}
        >
            <Button type="submit">SignOut</Button>
        </form>
    )
}
