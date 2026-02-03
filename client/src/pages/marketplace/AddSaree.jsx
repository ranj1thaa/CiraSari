import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import api from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../../style/addSaree.css';

const AddSaree = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    fabric: "",
    technique: "",
    region: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price || !form.fabric || !form.region || !form.technique || !file) {
      return toast.warn("Please fill all fields");
    }

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (file?.type.startsWith('image')) formData.append("images", file);

    try {
      await api.post('/saree/createSaree', formData);
      toast.success("Post uploaded");
      setForm({ title:"", price:"", fabric:"", technique:"", region:"", description:"" });
      setFile(null);
      navigate('/saree-collections');
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add-saree-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" name='title' value={form.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter price" name='price' value={form.price} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="fabric">
          <Form.Label>Fabric</Form.Label>
          <Form.Control type="text" placeholder="e.g. Silk, Cotton" name='fabric' value={form.fabric} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="technique">
          <Form.Label>Technique</Form.Label>
          <Form.Control type="text" placeholder="e.g. Handloom, Ikat" name='technique' value={form.technique} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="region">
          <Form.Label>Region</Form.Label>
          <Form.Control type="text" placeholder="e.g. Kanchipuram" name='region' value={form.region} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Enter description" name='description' value={form.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange}/>
        </Form.Group>

        <Button type="submit">Add Saree</Button>
      </Form>

      {file && file.type.startsWith("image") && (
        <div className="add-saree-preview">
          <img src={URL.createObjectURL(file)} alt="preview"/>
        </div>
      )}
    </div>
  );
};

export default AddSaree;
