import { Award, Target, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About ModernWeb
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a passionate team of developers and designers dedicated to creating
            exceptional digital experiences that make a difference.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              To empower businesses with innovative web solutions that drive growth,
              enhance user experiences, and deliver measurable results.
            </p>
            <p className="text-lg text-gray-600">
              We believe in the power of technology to transform ideas into reality
              and help our clients achieve their digital ambitions.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="flex items-center mb-4">
              <Target className="mr-3" size={32} />
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-lg">
              To be the leading digital agency known for innovation, quality,
              and customer satisfaction in the web development industry.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">
                We love what we do and pour our hearts into every project
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every detail of our work
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and creative solutions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
