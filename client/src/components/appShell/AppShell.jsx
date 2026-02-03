import { useContexts } from "../../contexts/Context"
import WorkerNavbar from "../../layouts/Navbar/WorkerNavbar"
import CustomerNavrbar from "../../layouts/Navbar/CustomerNavrbar"
import CustomerFooter from "../../layouts/Footer/CustomerFooter"
import WorkerFooter from "../../layouts/Footer/WorkerFooter"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
const AppShell = ({ children }) => {
  const { user, loading } = useContexts()
  useGSAP(()=>{
    const tl=gsap.timeline()
    tl.from(".tl2",{
      y:-1000,
      duration:0.3,
      delay:0.3
    })
    tl.from(".tl1",{
      y:1000,
      duration:0.2
    })
  })
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-white/70">Loading, please wait…</p>
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col bg-transparent tls">
      <div className="fixed top-0 left-0 right-0 z-50 tl2">
        {user?.role === "worker" ? <WorkerNavbar /> : <CustomerNavrbar />}
      </div>
      <main className=" flex-1 pt-[72px] sm:pt-[84px] px-3 sm:px-5 md:px-8 lg:px-12 pb-6 tl1">
        {children}
      </main>

      <div className="mt-auto">
        {user?.role === "worker" ? <WorkerFooter /> : <CustomerFooter />}
      </div>
    </div>
  )
}

export default AppShell
