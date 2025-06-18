"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Database,
  Zap,
  Lock,
  SlidersHorizontal,
  Code2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FeatureCard } from "@/components/Home/FeatureCard";
import { PricingCard } from "@/components/Home/PricingCard";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="py-6 px-10 sm:px-6 lg:px-12 grid grid-cols-2">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="px-4 sm:px-6 lg:px-12 text-xl font-extrabold tracking-tight text-[#7ac0ee]"
          >
            <TypeAnimation
              sequence={[
                "Chat with your Business",
                1000,
                "Chat with your Databases",
                1000,
                "Chat with your Files",
                1000,
                "Chat with your Excels",
                1000,
                "Chat with your PDFs",
                1000,
              ]}
              speed={50}
              style={{ fontSize: "2em" }}
              repeat={Infinity}
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className="px-4 sm:px-6 lg:px-12 mt-10 text-lg sm:text-xl max-w-3xl mx-auto text-muted-foreground"
          >
            <span>Empower your business with real-time</span>
            <br />
            <span>AI analytic for smarter strategies</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
            className="px-4 sm:px-6 lg:px-12 mt-10"
          >
            <Button
              size="lg"
              className="bg-[#34b192] px-4 py-2 rounded-xl shadow-lg  hover:scale-105 transition-all duration-300  text-white animate-bounce"
            >
              Get Insights Now
            </Button>
          </motion.div>
        </div>
      </main>

      <section
        id="features"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-500 dark:text-whit animate-pulse">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Natural Language Queries"
              description="Ask questions in plain English and get results instantly.  No SQL required."
              icon={<MessageSquare className="w-8 h-8 text-purple-400 mb-4" />}
            />
            <FeatureCard
              title="Broad Database Support"
              description="Works with PostgreSQL, MySQL, SQL Server, and more. Connect to your existing database."
              icon={<Database className="w-8 h-8 text-blue-400 mb-4" />}
            />
            <FeatureCard
              title="AI-Powered Insights"
              description="Get intelligent suggestions and auto-completion as you type."
              icon={<Zap className="w-8 h-8 text-yellow-400 mb-4" />}
            />
            <FeatureCard
              title="Secure & Private"
              description="Your data stays secure. We use industry-leading encryption and security practices."
              icon={<Lock className="w-8 h-8 text-green-400 mb-4" />}
            />
            <FeatureCard
              title="Customizable Interface"
              description="Tailor the look and feel to match your workflow with themes and settings."
              icon={
                <SlidersHorizontal className="w-8 h-8 text-pink-400 mb-4" />
              }
            />
            <FeatureCard
              title="Easy Integration"
              description="Integrate with your favorite tools and platforms via our API."
              icon={<Code2 className="w-8 h-8 text-orange-400 mb-4" />}
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-gray-500 dark:text-white animate-pulse">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Free"
              price="$0 / month"
              features={[
                "1 Database Connection",
                "100 Queries / Month",
                "Basic Features",
                "Community Support",
              ]}
              buttonText="Get Started Free"
              buttonVariant="outline"
            />
            <PricingCard
              title="Pro"
              price="$49 / month"
              features={[
                "Unlimited Databases",
                "Unlimited Queries",
                "All Basic Features",
                "Priority Support",
                "Advanced Analytics",
              ]}
              buttonText="Upgrade to Pro"
              buttonVariant="outline"
            />
            <PricingCard
              title="Enterprise"
              price="Contact Us"
              features={[
                "Custom Solutions",
                "Dedicated Account Manager",
                "SLA Guarantee",
                "Premium Support",
                "Custom Integrations",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-gray-500 dark:text-white animate-pulse">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6 dark:text-white">
                Have questions or need a custom solution? Reach out to our team.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-600 dark:text-white" />
                  <span className="text-gray-600 dark:text-white">
                    Email: support@chat2db.com
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-600 dark:text-white" />
                  <span className="text-gray-600 dark:text-white">
                    Phone: +1-555-123-4567
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-600 dark:text-white" />
                  <span className="text-gray-600 dark:text-white">
                    Address: 123 Main St, Anytown, USA
                  </span>
                </li>
              </ul>
            </div>
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-600 dark:text-white text-2xl">
                  Send us a message
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-white">
                  We will get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-600 dark:text-white"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      className="bg-black/20 text-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-600 dark:text-white"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      className="bg-black/20 text-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-gray-600 dark:text-white"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      className="bg-black/20 text-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-button transition-colors duration-300">
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
