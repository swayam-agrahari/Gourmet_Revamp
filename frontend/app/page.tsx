
import { Dashboard } from "./dashbaord/page";



export default function Home() {

  return (<>
    {/* <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} /> */}
    <Dashboard />
  </>
  );
}
