import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";
import { signUp, userLogin } from "../services/apiService";

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignIn) {
      console.log("Sign In Attempt:", {
        email: formData.email,
        password: formData.password,
      });
      try {
        // TO DO: commented this out for testing
        // const result = await userLogin(formData.email, formData.password);
        // console.log("Log In Successful:", result);
        // assume login is successful for now
        login("token", formData.email);
        navigate("/chat-interface");
      } catch (error) {
        setError("Log In Failed: " + error.message);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const result = await signUp(formData.email, formData.password);
        console.log("Sign Up Successful:", result);
        navigate("/chat-interface");
      } catch (error) {
        setError("Sign Up Failed: " + error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "confirmPassword" || name === "password") {
      setError("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-xl shadow-lg"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "var(--color-foreground)" }}
        >
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Username/Email Address"
              className="w-full pl-10 pr-4 py-2 rounded border"
              style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
              }}
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded border"
              style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
              }}
              required
            />
          </div>
          {!isSignIn && (
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-2 rounded border"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                }}
                required
              />
            </div>
          )}
          {error && <div className="text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
          >
            {isSignIn ? "Log In" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              setFormData({
                email: "",
                password: "",
                confirmPassword: "",
              });
              setError("");
            }}
            className="text-sm hover:underline cursor-pointer"
            style={{ color: "var(--color-accent)" }}
          >
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
