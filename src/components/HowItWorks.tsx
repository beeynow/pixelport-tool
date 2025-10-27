import { Upload, RefreshCw, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload File",
    description: "Drag & drop or click to upload your file. All formats supported."
  },
  {
    icon: RefreshCw,
    step: "2",
    title: "Select Format & Convert",
    description: "Choose your desired output format and let us handle the rest."
  },
  {
    icon: Download,
    step: "3",
    title: "Download Result",
    description: "Download your file instantly. It's then permanently deleted from our servers."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and secure file conversion in three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative inline-block">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shadow-soft">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
