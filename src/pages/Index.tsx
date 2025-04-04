import React from "react";
import { useNavigate } from "react-router-dom";
import { Hospital, Building, Users, Medal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Hospital className="h-10 w-10 text-primary" />,
      title: "Comprehensive Hospital Management",
      description:
        "Efficiently manage all hospital details in one centralized system.",
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "City-based Filtering",
      description:
        "Quickly find hospitals in specific cities with advanced filtering.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Detailed Hospital Profiles",
      description:
        "Access comprehensive information including specialties, ratings, and more.",
    },
    {
      icon: <Medal className="h-10 w-10 text-primary" />,
      title: "Quality Metrics",
      description:
        "Compare hospitals based on ratings and specialized departments.",
    },
  ];

  return (
    <div className="page-transition min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 pt-20 sm:pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text text-4xl font-bold leading-tight tracking-tighter text-transparent sm:text-5xl md:text-6xl">
              Hospital Management System
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Efficiently manage and discover hospitals across cities with our
              comprehensive hospital management platform. Find the right
              healthcare facility for your needs.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                size="lg"
                onClick={() => navigate("/hospitals")}
                className="rounded-full bg-primary px-8 text-primary-foreground transition-all duration-300 hover:shadow-lg"
              >
                Browse Hospitals
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/create")}
                className="rounded-full px-8 transition-all duration-300 hover:shadow-md"
              >
                Add New Hospital
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 w-full max-w-5xl"
          >
            <div className="glass rounded-2xl border border-border/40 p-6 shadow-lg backdrop-blur-lg">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-xl p-4 text-center transition-all duration-300 hover:bg-accent/50"
                  >
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -right-20 bottom-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
      </section>

      {/* Secondary Section */}
      <section className="container mx-auto my-20 px-4">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Comprehensive Hospital Management Platform
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our system provides a streamlined approach to hospital
                information management. Create, update, and maintain detailed
                profiles for healthcare facilities.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Easy hospital creation and management",
                  "City-based filtering and search",
                  "Detailed information tracking",
                  "Speciality and service cataloging",
                  "Quality rating and comparison",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="mr-3 rounded-full bg-primary/10 p-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/hospitals")}
                className="mt-8 space-x-2"
              >
                <span>Explore Hospitals</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="overflow-hidden rounded-xl border border-border shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hospital"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to streamline your hospital management?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Start using our platform today to efficiently manage hospital
            information and improve healthcare facility discovery.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/create")}
            className="rounded-full bg-primary px-8 text-primary-foreground"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* New ChatBot Section */}
      <ChatBot />
    </div>
  );
};

export default Index;

// --------------------
// New ChatBot Component (Newly Added Section)
// --------------------
import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Your_API_KEY", // Replace with your actual API key
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant for hospital-related queries. Answer questions about hospitals, services provided, availability, and other related information.",
              },
              { role: "user", content: input },
            ],
            max_tokens: 150,
          }),
        }
      );

      const data = await response.json();
      const botMessage = {
        text:
          data.choices?.[0]?.message?.content?.trim() ||
          "I'm not sure, please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response.", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 rounded-lg bg-white shadow-xl">
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
        <span className="text-lg font-semibold">Hospital Assistant</span>
        <MessageCircle className="h-5 w-5" />
      </div>
      <div className="h-64 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              msg.sender === "user"
                ? "bg-primary/20 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1"
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-primary text-white rounded-md"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
