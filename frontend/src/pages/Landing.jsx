// src/pages/Landing.jsx
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .leaf {
          position: absolute;
          font-size: 2rem;
          opacity: 0.6;
          animation: float 4s ease-in-out infinite;
        }
        .leaf-1 { top: 10%; left: 15%; animation-delay: 0s; }
        .leaf-2 { top: 30%; right: 10%; animation-delay: 1s; }
        .leaf-3 { bottom: 40%; left: 8%; animation-delay: 2s; }
        .leaf-4 { top: 60%; right: 20%; animation-delay: 1.5s; }
      `}</style>

      <nav className="w-full flex items-center justify-between p-6 max-w-7xl mx-auto relative z-20">
        <div className="flex items-center gap-3">
          <i className="fas fa-leaf text-3xl text-emerald-700"></i>
          <span className="font-bold text-2xl text-emerald-900">Paryavaran Rakshak</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg text-emerald-800 font-medium hover:bg-emerald-100 transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-emerald-700 text-white font-medium hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl"
          >
            Register
          </Link>
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="text-center p-6 max-w-6xl mx-auto pt-12 pb-20 relative">
          {/* Floating leaves */}
          <div className="leaf leaf-1">🍃</div>
          <div className="leaf leaf-2">🍃</div>
          <div className="leaf leaf-3">🌿</div>
          <div className="leaf leaf-4">🍃</div>

          <div className="inline-block mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-emerald-900 text-base font-semibold shadow-md animate-fadeIn border border-emerald-200">
            प्रकृतिः माता, रक्षणम् अस्माकम् कर्तव्यम्
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-900 mb-6 leading-tight animate-slideUp">
            Nature is Our Mother.<br />
            <span className="text-emerald-600">Let's Protect Her.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-emerald-800 mb-12 max-w-4xl mx-auto leading-relaxed animate-slideUp" style={{animationDelay: '0.2s'}}>
            Sounds ironic, doesn't it? While we call nature our mother, we've watched millions of trees fall, crops burn, and waters pollute. <strong>We're witnessing the consequences of our actions</strong> — and if we don't act now, it will be our end soon.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16 animate-slideUp" style={{animationDelay: '0.4s'}}>
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg bg-emerald-700 text-white text-lg font-semibold shadow-xl hover:bg-emerald-800 transition-all hover:scale-105"
            >
              Begin Your Journey
            </Link>
          </div>

          {/* Crisis Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20 animate-slideUp" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-red-200 hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-red-600 mb-2">6.7M</div>
              <p className="text-gray-700">hectares of rainforest lost last year</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-orange-600 mb-2">70%</div>
              <p className="text-gray-700">of India's surface water unfit for consumption</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-amber-200 hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-amber-600 mb-2">10%</div>
              <p className="text-gray-700">of Indians feel informed about climate change</p>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 text-center mb-8">
              The Root of the Problem
            </h2>
            <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              Is it just a lack of awareness? No. It's a mixture of <strong>not knowing</strong> and <strong>not understanding</strong> how our daily actions affect the environment. Students learn about climate change in textbooks, but never see the real consequences. They're never motivated to take action.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-book text-red-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Theoretical Education</h3>
                  <p className="text-gray-600">Schools teach textbook content with no real-world application</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-gamepad text-orange-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Lack of Engagement</h3>
                  <p className="text-gray-600">Traditional tools fail to motivate or inspire action</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-users text-amber-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Low Youth Participation</h3>
                  <p className="text-gray-600">Students remain disconnected from environmental practices</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">No Sustainable Habits</h3>
                  <p className="text-gray-600">Three out of four Indians ignore basic eco-friendly habits</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="bg-gradient-to-b from-white to-emerald-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 text-center mb-6">
              Our Solution: A Journey of Transformation
            </h2>
            <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
              What our project aims to change is exactly that. Our prototype is divided into <strong>6 progressive themes</strong> — each serving a purpose, a cog in the wheel. We show you the reality of what Earth will look like if we continue, then guide you toward the right decisions and empower you to take action.
            </p>

            {/* Theme Journey Visualization */}
            <div className="relative max-w-5xl mx-auto mb-20">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-red-300 hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 mt-2">Polluted Theme</h3>
                  <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Create Sympathy</p>
                  <p className="text-sm text-gray-500">Witness the harsh reality of environmental degradation</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-orange-300 hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 mt-2">Plantless Theme</h3>
                  <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Create Fear</p>
                  <p className="text-sm text-gray-500">Understand the consequences of inaction</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-blue-300 hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 mt-2">Rainy Theme</h3>
                  <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Give Knowledge</p>
                  <p className="text-sm text-gray-500">Learn about environmental solutions and practices</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-300 hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 mt-2">Small Plants Theme</h3>
                  <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Give Motivation</p>
                  <p className="text-sm text-gray-500">See the first signs of positive change</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-green-300 hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 mt-2">Tree Theme</h3>
                  <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Create Bond</p>
                  <p className="text-sm text-gray-500">Build a lasting connection with nature</p>
                </div>
                
                <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-teal-300 hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 mt-2">Blossom Theme</h3>
                  <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Perform the Duty</p>
                  <p className="text-sm text-gray-500">Take sustained action and inspire others</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 text-center mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">
              We don't just teach about the environment — we make you <strong>feel it, live it, and change because of it</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-vr-cardboard text-purple-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">VR Immersion</h3>
                <p className="text-gray-600 text-sm">Experience environmental disasters firsthand through virtual reality</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-gamepad text-blue-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Gamification</h3>
                <p className="text-gray-600 text-sm">Earn eco-credits, unlock themes, compete on leaderboards</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-coins text-green-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Eco-Currency</h3>
                <p className="text-gray-600 text-sm">Redeem rewards with KVIC products for real-world impact</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tasks text-emerald-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Mission-Driven</h3>
                <p className="text-gray-600 text-sm">Complete real environmental tasks and see your impact</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-brain text-yellow-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Psychology-Driven</h3>
                <p className="text-gray-600 text-sm">We target emotions: sympathy, fear, motivation, confidence</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book-open text-indigo-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Curated Content</h3>
                <p className="text-gray-600 text-sm">Lessons and quizzes aligned with current school syllabus</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-pink-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Case Studies</h3>
                <p className="text-gray-600 text-sm">Learn from real environmental struggles and solutions</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-teal-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Track Progress</h3>
                <p className="text-gray-600 text-sm">Teachers monitor student progress with detailed dashboards</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Become a Paryavaran Rakshak?
            </h2>
            <p className="text-xl text-emerald-50 mb-8">
              Join thousands of students learning to protect our planet through engaging, psychology-driven education.
            </p>
            <Link
              to="/register"
              className="inline-block px-10 py-4 rounded-lg bg-white text-emerald-700 text-lg font-bold shadow-xl hover:bg-emerald-50 transition-all hover:scale-105"
            >
              Start Your Journey Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-emerald-700/80 bg-emerald-50 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-2">© {new Date().getFullYear()} Paryavaran Rakshak • Learn. Protect. Repeat.</p>
          <p className="text-xs text-emerald-600/70">Award-winning gamified environmental education platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;