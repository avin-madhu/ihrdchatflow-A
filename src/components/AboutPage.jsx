import React from "react";
import { Bot, Brain, Zap } from "lucide-react";
import Radiusaboutuspic from "./Radiusaboutuspic.jpg";
function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 to-purple-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6 font-serif">
            About RADIUS
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Transforming learning experiences with the power of AI technology.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={Radiusaboutuspic}
              alt="AI Technology"
              className="rounded-xl shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-serif">
              Introducing RADIUS
            </h2>
            <p className="text-white/80 leading-relaxed">
              Introducing RADIUS, your intelligent assistant designed to
              simplify learning and communication like never before. With
              RADIUS, you'll receive personalized support, get quick answers to
              your questions, and enjoy tailored assistance based on your needs.
              Whether you're seeking instant help or in-depth insights, RADIUS
              is here to guide you. Always ready to assist, it ensures smarter
              interactions, faster solutions, and a more efficient way to
              elevate your educational journey with RADIUS by your side!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Bot className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Intelligent Assistance
            </h3>
            <p className="text-white/70">
              Provide accurate and contextual responses to your queries.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Brain className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Personalized Responses
            </h3>
            <p className="text-white/70">
              Receive personalized recommendations and solutions, tailored to
              your needs and preferences.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Zap className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Instant Response
            </h3>
            <p className="text-white/70">
              Get immediate answers to your questions, available 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
