import { Link } from "react-router-dom"
import { Button } from "./ui/button"
function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-white/10 backdrop-blur-md shadow-md rounded-b-xl">
      <Link to="/"><span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NetChat</span></Link>

      <div className="flex gap-5">

        <Link to="/login"><Button variant="ghost">Kirish</Button></Link>
        <Link to="/register"><Button variant="destructive">Ro'yhatdan o'tish</Button></Link>
      </div>
    </div>
  )
}

export default Header;