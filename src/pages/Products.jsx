import { useState } from "react";
import "../styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = formData;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, formData]);
    }

    setFormData({
      image: "",
      title: "",
      description: "",
      price: ""
    });

    setShowForm(false);
  };

  const handleDelete = (index) => {
    const filtered = products.filter((_, i) => i !== index);
    setProducts(filtered);
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="products">

      <div className="top">
        <h2>Products</h2>
        <button onClick={() => setShowForm(!showForm)}>
        { !showForm ? "+ Add Products" : <div className="close-form">X</div>}
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <button type="submit">
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}

      <div className="product-grid">
        {products.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt="" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h4>${item.price}</h4>

            <div className="actions">
              <button onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}