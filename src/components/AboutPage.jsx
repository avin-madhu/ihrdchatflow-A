import React from 'react';
import { Bot, Brain, Zap } from 'lucide-react';

function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 to-purple-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6 font-serif">About ChatFlow</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Revolutionizing educational assistance through advanced AI technology
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1593376893114-1aed528d80cf?auto=format&fit=crop&q=80&w=800"
              alt="AI Technology"
              className="rounded-xl shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-serif">Our Mission</h2>
            <p className="text-white/80 leading-relaxed">
              ChatFlow is dedicated to transforming the way students and educators interact with educational resources. 
              Our AI-powered platform provides instant, accurate responses while adapting to each user's unique learning style.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Bot className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Intelligent Assistance</h3>
            <p className="text-white/70">Advanced AI algorithms provide accurate and contextual responses to your queries.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Brain className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Adaptive Learning</h3>
            <p className="text-white/70">Personalized learning experience that adapts to your understanding and pace.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Zap className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Instant Response</h3>
            <p className="text-white/70">Get immediate answers to your questions, available 24/7.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;