/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../hooks/useToast";
import { FaPaperPlane, FaImage } from "react-icons/fa";

export default function Buzon() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    asunto: "",
    mensaje: "",
    imagen: null,
    preview: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({
            ...prev,
            imagen: file,
            preview: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        showToast("error", "Solo se permiten imágenes.");
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.asunto.trim().length < 5) {
      showToast("error", "El asunto debe tener al menos 5 caracteres.");
      return;
    }
    if (form.mensaje.trim().length < 10) {
      showToast("error", "El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("asunto", form.asunto);
      formData.append("mensaje", form.mensaje);
      if (form.imagen) formData.append("imagen", form.imagen);

      const response = await fetch("http://localhost/mail.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      showToast("success", "¡Mensaje enviado con éxito!");
      setForm({ asunto: "", mensaje: "", imagen: null, preview: null });
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        📬 Buzón
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-lg font-semibold">Asunto:</label>
          <input
            type="text"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 shadow-md"
            placeholder="Escribe el asunto..."
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-lg font-semibold">Mensaje:</label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800 shadow-md"
            placeholder="Escribe tu mensaje..."
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="flex text-lg font-semibold items-center gap-2">
            <FaImage /> Adjuntar imagen (opcional):
          </label>
          <input
            type="file"
            name="imagen"
            onChange={handleChange}
            accept="image/*"
            className="w-full border px-3 py-2 rounded-lg bg-white text-gray-800 shadow-md"
          />
        </motion.div>

        {form.preview && (
          <motion.div
            className="w-full h-44 mt-4 flex items-center justify-center border rounded-lg bg-white overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img src={form.preview} alt="Previsualización" className="h-full object-contain rounded-lg" />
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-bg dark:text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-secondary-hover transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enviar Mensaje <FaPaperPlane />
        </motion.button>
      </form>
    </motion.div>
  );
}
