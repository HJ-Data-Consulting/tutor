export default function Services() {
  const services = [
    {
      title: "Programming Languages",
      description: "Master the fundamentals and advanced concepts of various coding languages",
      icon: "⚪"
    },
    {
      title: "Web Development",
      description: "Build modern, responsive websites and web applications",
      icon: "◉"
    },
    {
      title: "App Development",
      description: "Create mobile and desktop applications from concept to deployment",
      icon: "▣"
    },
    {
      title: "Git Version Control",
      description: "Learn collaborative development and code management with Git",
      icon: "⚙"
    },
    {
      title: "Google Cloud Platform",
      description: "Deploy and scale applications using GCP services and tools",
      icon: "◐"
    },
    {
      title: "Model Training",
      description: "Understand machine learning concepts and train your own models",
      icon: "◯"
    }
  ];

  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Services</h2>
          <p className="text-lg text-gray-600">
            Comprehensive tutoring in modern technology and development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="text-4xl mb-4 text-gray-600">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
