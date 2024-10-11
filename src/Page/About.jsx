import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"





export default function About() {
  const {user} = useContext(AuthContext)
  
  return (
    <div>about
      {user?.email}

      <h1 className="mt-5 text-2xl p-11">Create Pending...</h1>
    </div>
  )
}
