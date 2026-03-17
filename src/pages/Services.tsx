import { Code, Smartphone, Palette, Globe, Shield, Zap } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: <Code className="text-blue-600" size={40} />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["React/Vue/Angular", "Node.js/Python", "Database Design", "API Development"]
    },
    {
      icon: <Smartphone className="text-purple-600" size={40} />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "iOS/Android Native", "App Store Deployment"]
    },
    {
      icon: <Palette className="text-green-600" size={40} />,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces with great user experience",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      icon: <Globe className="text-orange-600" size={40} />,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your business",
      features: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"]
    },
    {
      icon: <Shield className="text-red-600" size={40} />,
      title: "Security Solutions",
      description: "Protect your business with advanced security measures",
      features: ["Security Audits", "Penetration Testing", "SSL Setup", "Data Protection"]
    },
    {
      icon: <Zap className="text-yellow-600" size={40} />,
      title: "Performance Optimization",
      description: "Make your website faster and more efficient",
      features: ["Speed Optimization", "CDN Setup", "Caching Strategies", "Monitoring"]
    }
  ]

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of digital services to help your business
            thrive in the modern world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            We can tailor our services to meet your specific requirements
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services
