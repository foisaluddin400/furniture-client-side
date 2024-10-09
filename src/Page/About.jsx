import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"





export default function About() {
  const {user} = useContext(AuthContext)
  
  return (
    <div>about
      {user.email}
    </div>
  )
}
