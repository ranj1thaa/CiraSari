import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../utils/axios';
import '../../style/editSaree.css'

const EditSaree = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    price: '',
    fabric: '',
    technique: '',
    region: '',
    description: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchSaree = async () => {
      try {
        const res = await api.get('/saree/getSaree'); 
        const saree = res.data.find(s => s._id === id);
        if (saree) {
          setForm({
            title: saree.title,
            price: saree.price,
            fabric: saree.fabric,
            technique: saree.technique,
            region: saree.region,
            description: saree.description
          });
        }
      } catch (err) {
        console.log(err);
        toast.error('Could not fetch saree');
      }
    };
    fetchSaree();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.price || !form.fabric || !form.region || !form.description) {
      return toast.warn('Please fill all fields');
    }

    const formData = new FormData();
    formData.append("title", form.title)
    formData.append("price", form.price)
    formData.append("fabric", form.fabric)
    formData.append("technique", form.technique)
    formData.append("region", form.region)
    formData.append("description", form.description)
    if(file){
      if(file.type.startsWith('image')){
        formData.append("images", file)
      }
    }

    try {
      await api.put(`/saree/update/${id}`, formData);
      toast.success('Saree updated successfully');
      navigate('/saree-collections');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update saree');
    }
  };

  return (
    <Form className="edit-saree-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" value={form.title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={form.price} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fabric</Form.Label>
        <Form.Control name="fabric" value={form.fabric} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Technique</Form.Label>
        <Form.Control name="technique" value={form.technique} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Region</Form.Label>
        <Form.Control name="region" value={form.region} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={4} name="description" value={form.description} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Add Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
      </Form.Group>

      <Button type="submit">Update Saree</Button>
      {file && file.type.startsWith("image") && (
    <div className="edit-saree-preview">
      <img src={URL.createObjectURL(file)} alt="preview"/>
    </div>
  )}
    </Form>
  );
};

export default EditSaree;
