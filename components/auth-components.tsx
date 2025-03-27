import { signIn, signOut } from "auth"
import { Button } from "./ui/button"
import router from "next/router"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("okta")
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    // <form
    //   action={async () => {
    //     "use server"
    //     await signOut()
    //   }}
    //   className="w-full"
    // >
    //   <Button variant="ghost" className="w-full p-0" {...props}>
    //     Sign Out
    //   </Button>
    // </form>

      <Button variant="ghost" className="w-full p-0" {...props} onClick={signOutHandler}>
        Sign Out
      </Button>
  )
}

function signOutHandler() {
  router.push("/auth/federated-sign-out");
}
