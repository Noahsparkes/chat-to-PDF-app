import { Button } from "@/components/ui/button";
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    name: "Store your PDF Documents",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere.",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Responses",
    description:
      "Experience lightning fast responses from our AI powered chatbot, ensuring you get the answers you need in seconds.",
    icon: ZapIcon,
  },
  {
    name: "Chat Memorisation",
    description:
      "Our intelligent chatbot remembers your previous conversations, ensuring you get the most relevant answers.",
    icon: BrainCogIcon,
  },
  {
    name: "Interactive PDF Viewer",
    description:
      "Engage with your PDFs like never before using our intuitive PDF viewer.",
    icon: EyeIcon,
  },
  {
    name: "Cloud Backup",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere.",
    icon: ServerCogIcon,
  },
  {
    name: "Responsive Across Devices",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere.",
    icon: MonitorSmartphoneIcon,
  },
];

export default function Home() {
  return (
    <main className="overflow-scroll bg-gradient-to-bl p-2 lg:p-5 from-white to-indigo-600 flex-1">
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Your Interactive Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Transform Your PDFs into Interactive Conversations
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Introducing{" "}
              <span className="font-bold text-indigo-600">Chat with PDF.</span>
              <br />
              <br />
              Upload your document, and our chatbot will answer your questions, summarize content, and more.{" "}
              <span className="font-bold text-indigo-600">Chat with PDF</span>{" "}
              <span className="font-bold text-indigo-600">dynamic conversations</span>, enhancing productivity 10x fold effortlessly.
            </p>

            <Button asChild className="mt-10">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>

          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Image
                alt="App screenshot"
                src="https://via.placeholder.com/800x500"
                width={800}
                height={500}
                className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              />
              <div aria-hidden="true" className="relative">
                <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-white/95 pt-[5%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-flow-col-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="flex items-center">
                  <feature.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-indigo-600 mr-2"
                  />
                  <span className="inline font-semi-bold text-gray-900">
                    {feature.name}
                  </span>
                </dt>
                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
