import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAPI } from "../utils/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await fetchAPI("/users", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      // Signup doesn't return a token, so send them to sign in next
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white border border-slate-200 rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

      {error && (
        <div className="alert alert-error text-sm mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-white text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          className="input input-bordered w-full bg-white text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="link link-primary">
          Sign In
        </Link>
      </p>
    </div>
  );
}