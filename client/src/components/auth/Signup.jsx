import { useState } from "react"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../../utils/axios"
import { useContexts } from "../../contexts/Context"
import bgIMG from "../../assets/bgIMG.jpg"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
const Signup = () => {
  const navigate = useNavigate()
  const { setUser } = useContexts()
  useGSAP(()=>{
    gsap.from(".login-div",{
      y:-800,
      duration:1.6,
      opacity:0
    })
  })

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    isWorker: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password)
      return toast.warn("Please enter email and password")

    if (form.password !== form.confirmPassword)
      return toast.warn("Passwords do not match")

    try {
      const res = await api.post('/auth/signup', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.isWorker ? "worker" : "customer"
      })

      toast.success("Signup successful")
      setUser(res.data.user)
      navigate(`/${res.data.user.role}/dashboard`)
    } catch(err) {
      toast.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center section-padding" style={{backgroundImage: `linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.65)), url(${bgIMG})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="w-full max-w-xl card px-6 py-8 sm:px-10 login-div">

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Account
        </h2>

        <p className="text-sm text-center text-muted mb-6">
          Join CiraSari and be part of the artisan community
        </p>

        <Form onSubmit={handleSignupSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} className="rounded-xl py-2"/>
            </Col>

            <Col xs={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={form.email} onChange={handleChange} className="rounded-xl py-2"/>
            </Col>

            <Col xs={12}>
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password"  value={form.password} onChange={handleChange} className="rounded-xl py-2"/>
            </Col>

            <Col xs={12}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="rounded-xl py-2" />
            </Col>

            <Col xs={12}>
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" value={form.phone} onChange={handleChange} className="rounded-xl py-2" />
            </Col>
          </Row>

          <div className="mt-4 p-3 rounded-xl bg-black/5 border">
            <Form.Check type="checkbox" label="I am a worker / weaver" checked={form.isWorker}
              onChange={(e) =>
                setForm(prev => ({ ...prev, isWorker: e.target.checked }))
              }/>
          </div>

          <button type="submit" className="w-full primary-btn mt-5">
            Sign Up
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link to="/login" className="ms-1 text-[var(--royal-gold)] underline">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Signup
