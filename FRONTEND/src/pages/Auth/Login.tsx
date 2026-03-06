import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/services/auth.service"
import { useNavigate, Link } from "react-router-dom"

export default function Login(){

 const navigate = useNavigate()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const mutation = useMutation({
  mutationFn: loginUser,
  onSuccess:(data)=>{
    localStorage.setItem("token",data.token)
    navigate("/events")
  }
 })

 const handleSubmit=(e:React.FormEvent)=>{
  e.preventDefault()
  mutation.mutate({ email, password })
 }

 return(

  <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-20">

   <input
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    className="border p-2 w-full"
   />

   <input
    type="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    className="border p-2 w-full"
   />

   <button type="submit" className="bg-indigo-600 text-white p-2 w-full">
    Sign In
   </button>

   <Link to="/register">
    Create account
   </Link>

  </form>

 )
}