import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content: "WindBack has completely transformed how I manage my work. I can instantly recall any conversation or decision without endless scrolling through notes.",
    rating: 5,
    image: "👩‍💼"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Founder & CEO",
    content: "The AI search is incredibly accurate. I've saved hours every week just by being able to find exactly what I need in seconds.",
    rating: 5,
    image: "👨‍💼"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Software Engineer",
    content: "Cross-device sync works flawlessly. My entire digital memory is always at my fingertips, whether I'm at my desk or on the go.",
    rating: 5,
    image: "👩‍💻"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Consultant",
    content: "The privacy features give me peace of mind. I can capture everything without worrying about security or privacy issues.",
    rating: 5,
    image: "👨‍💼"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by professionals worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See what users are saying about WindBack
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Join thousands of professionals using WindBack
          </p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">2,500+</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">4.8★</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">98%</p>
              <p className="text-sm text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
