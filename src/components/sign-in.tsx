import { signIn } from "../../src/auth"
import { Button } from "./ui/button"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <Button type="submit">SignIn with Google</Button>
        </form>
    )
}
