import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/axios";
import '../../style/contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    description: "",
    type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact/feedback", form);
      toast.success("Feedback sent successfully");
      setForm({ name: "", email: "", phoneNo: "", description: "", type: "" });
    } catch (err) {
      toast.error("Can't send feedback");
      console.log(err);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-info">
        <h1>Get in Touch</h1>
        <p>CiraSari Traditional Weaves</p>
        <p>Karnataka, India</p>
        <p>📞 +91 1234567890</p>
        <p>✉️ r.17ranjitha@gmail.com</p>
      </div>

      <div className="contact-form">
        <h1>Feedback / Complaint Form</h1>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} value={form.name} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} value={form.email} />
          <input name="phoneNo" placeholder="Phone Number" onChange={handleChange} value={form.phoneNo} />
          <select name="type" onChange={handleChange} value={form.type}>
            <option value="" disabled>Select Request / Complaint Type</option>
            <option value="Order Issue">Order Issue</option>
            <option value="Payment Issue">Payment Issue</option>
            <option value="Weaver Support">Weaver Support</option>
            <option value="Product Quality">Product Quality</option>
            <option value="Delivery Delay">Delivery Delay</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="General Feedback">General Feedback</option>
          </select>
          <textarea name="description" placeholder="Describe your issue" onChange={handleChange} value={form.description} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
