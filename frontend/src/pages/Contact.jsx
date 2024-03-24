import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { useState } from "react";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    subject: "",
    message: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/feedbacks`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <title>Contact Us</title>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center text-[26px]">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-[14px] text-center text__para">
          Got a technical issue? Want to send feedback about a beat feature? Let
          us know.
        </p>
        <form onSubmit={submitHandler} className="space-y-8">
          <div>
            <label htmlFor="name" className="form__label">
              Your Name
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form__input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form__label">
              Your Email
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form__input mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              onChange={handleInputChange}
              name="subject"
              value={formData.subject}
              className="form__input mt-1"
              placeholder="Let us know how we can help you"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your Message
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              name="message"
              onChange={handleInputChange}
              value={formData.message}
              className="form__input mt-1"
              placeholder="Leave a comment....."
            />
          </div>

          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[15px] leading-[30px] rounded-lg px-4 py-2"
          >
            {loading ? <HashLoader size={35} color="#fffff" /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
