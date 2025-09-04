import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(result.message);
        reset();
      } else {
        setMessage(result.error || "Error occurred!");
      }
    } catch (err) {
      console.error(" Error:", err);
      setMessage("Internal Server Error");
    }
  };

   return (
    <div style={outerWrapper}>
      <div style={cardWrapper}>
        <h2 style={titleStyle}>🏫 Add New School</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          style={formStyle}
        >
          <div>
            <input
              placeholder="School Name"
              {...register("name", { required: "Name is required" })}
              style={inputStyle}
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>

          <div>
            <input
              placeholder="Address"
              {...register("address", { required: "Address is required" })}
              style={inputStyle}
            />
            {errors.address && <p style={errorStyle}>{errors.address.message}</p>}
          </div>

          <div>
            <input
              placeholder="City"
              {...register("city", { required: "City is required" })}
              style={inputStyle}
            />
            {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
          </div>

          <div>
            <input
              placeholder="State"
              {...register("state")}
              style={inputStyle}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Contact Number"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact must be 10 digits",
                },
              })}
              style={inputStyle}
            />
            {errors.contact && <p style={errorStyle}>{errors.contact.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              style={inputStyle}
            />
            {errors.email_id && <p style={errorStyle}>{errors.email_id.message}</p>}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "School image is required" })}
              style={fileInputStyle}
            />
            {errors.image && <p style={errorStyle}>{errors.image.message}</p>}
          </div>

          <button type="submit" style={buttonStyle}>
            ➕ Add School
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: message.includes("success") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const outerWrapper = {
  minHeight: "90vh",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  fontFamily: "Arial, sans-serif", 
};

const cardWrapper = {
  background: "#fff",
  padding: "35px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  width: "100%",
  maxWidth: "370px",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
  fontSize: "22px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  width: "95%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
};

const fileInputStyle = {
  width: "95%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  background: "#f9f9f9",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
};

const errorStyle = {
  color: "red",
  fontSize: "13px",
  marginTop: "4px",
};