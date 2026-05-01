"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";

import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Headphones,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Table2,
  AlertCircle,
Loader2,
Send,
  Wrench,
} from "lucide-react";

import {
  SiGoogle,
  SiGooglesheets,
  SiCanva,
  SiFigma,
  SiNotion,
  SiSlack,
  SiClickup,
  SiTrello,
  SiAirtable,
} from "react-icons/si";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
const marqueeItems = [
  "Inbox & Calendar",
  "Daily Support",
  "Documents & Records",
  "Organized Clearly",
  "Research & Reports",
  "Prepared Carefully",
  "Digital Tools",
  "Used Confidently",
  "Admin Support",
  "Clear Communication",
  "Workflow Help",
  "Tech-Savvy Assistance",
];

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const heroCards = [
  {
    title: "Organized Workflows",
    desc: "Cleaner day-to-day operations",
    icon: ClipboardCheck,
  },
  {
    title: "Clear Communication",
    desc: "Reliable updates and follow-through",
    icon: MessageSquareText,
  },
  {
    title: "Tech-Savvy Support",
    desc: "Comfortable with business tools",
    icon: Wrench,
  },
];

const supportHighlights = [
  {
    title: "Inbox & Calendar",
    desc: "Email handling, scheduling, reminders, and day-to-day coordination.",
    icon: Inbox,
  },
  {
    title: "Documents & Records",
    desc: "Organized files, trackers, documentation, and accurate record keeping.",
    icon: FileText,
  },
  {
    title: "Research & Reports",
    desc: "Structured research, summaries, and carefully prepared business support work.",
    icon: Search,
  },
  {
    title: "Digital Tools",
    desc: "Confident support across dashboards, forms, spreadsheets, and admin systems.",
    icon: LayoutDashboard,
  },
];
const tools = [
  {
    name: "Google Workspace",
    desc: "Docs, Drive, Gmail, and team collaboration",
    icon: SiGoogle,
    className: "text-blue-600",
  },
  {
    name: "Microsoft Office",
    desc: "Documents, presentations, and admin files",
    icon: BriefcaseBusiness,
    className: "text-orange-600",
  },
  {
    name: "Excel",
    desc: "Reports, trackers, records, and data cleanup",
    icon: Table2,
    className: "text-emerald-700",
  },
  {
    name: "Google Sheets",
    desc: "Live trackers, lists, and shared spreadsheets",
    icon: SiGooglesheets,
    className: "text-emerald-600",
  },
  {
    name: "Canva",
    desc: "Simple graphics, social posts, and documents",
    icon: SiCanva,
    className: "text-cyan-500",
  },
  {
    name: "Figma",
    desc: "Design review, UI files, and visual collaboration",
    icon: SiFigma,
    className: "text-violet-600",
  },
  {
    name: "Notion",
    desc: "Knowledge bases, notes, and task organization",
    icon: SiNotion,
    className: "text-slate-900",
  },
  {
    name: "Slack",
    desc: "Team communication and project updates",
    icon: SiSlack,
    className: "text-purple-600",
  },
  {
    name: "ClickUp",
    desc: "Task tracking, workflows, and project boards",
    icon: SiClickup,
    className: "text-pink-600",
  },
  {
    name: "Trello",
    desc: "Simple boards, task lists, and progress tracking",
    icon: SiTrello,
    className: "text-blue-600",
  },
  {
    name: "Airtable",
    desc: "Databases, trackers, and structured records",
    icon: SiAirtable,
    className: "text-amber-500",
  },
  {
    name: "CRM Tools",
    desc: "Client records, leads, and follow-up tracking",
    icon: Database,
    className: "text-slate-700",
  },
];

const whyItems = [
  {
    title: "Detail-oriented support",
    text: "Tasks are handled carefully, with clean records and clear follow-through.",
    icon: ShieldCheck,
  },
  {
    title: "Strong communication",
    text: "Expect dependable updates and thoughtful handling of priorities.",
    icon: MessageSquare,
  },
  {
    title: "Tech-comfortable workflow help",
    text: "Comfortable with dashboards, forms, spreadsheets, and business tools.",
    icon: Table2,
  },
  {
    title: "Research and organization",
    text: "Useful for admin, research, documentation, and workflow-heavy support work.",
    icon: Search,
  },
];

const processItems = [
  ["01", "Share your needs", "Tell us the tasks, priorities, and expected output."],
  ["02", "Clarify and organize", "We structure the work and make sure expectations are clear."],
  ["03", "Complete the work", "Tasks are handled carefully, efficiently, and professionally."],
  ["04", "Stay updated", "You receive clear progress notes and organized delivery."],
];

const serviceOptions = [
  "Inbox and calendar",
  "Documents and records",
  "Research and reports",
  "Digital tools and workflows",
  "General admin support",
];

type ContactField = "name" | "email" | "service" | "message";

type ContactErrors = Partial<Record<ContactField, string>>;

export default function Home() {
const [isSubmitting, setIsSubmitting] = useState(false);
const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
  "idle"
);
const [formMessage, setFormMessage] = useState("");
const [errors, setErrors] = useState<ContactErrors>({});
const [selectedService, setSelectedService] = useState("");
const [isServiceOpen, setIsServiceOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  function clearFieldError(field: ContactField) {
  setErrors((prev) => {
    const next = { ...prev };
    delete next[field];
    return next;
  });
}

function getFieldClass(field: ContactField) {
  return [
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60",
    errors[field]
      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
      : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
  ].join(" ");
}

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (isSubmitting) return;

  setFormStatus("idle");
  setFormMessage("");

  const form = e.currentTarget;
  const formData = new FormData(form);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const nextErrors: ContactErrors = {};

  if (!name) {
    nextErrors.name = "Name is required.";
  }

  if (!email) {
    nextErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nextErrors.email = "Please enter a valid email address.";
  }

  if (!selectedService) {
    nextErrors.service = "Please select a service.";
  }

  if (!message) {
    nextErrors.message = "Message is required.";
  }

  if (Object.keys(nextErrors).length > 0) {
    setErrors(nextErrors);
    setFormStatus("error");
    setFormMessage("Please complete the required fields.");
    return;
  }

  setIsSubmitting(true);
  setErrors({});

  const payload = {
    name,
    email,
    company,
    service: selectedService,
    budget,
    message,
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || "Something went wrong.");
    }

    setFormStatus("success");
    setFormMessage(
      "Your inquiry has been sent successfully. I’ll get back to you soon."
    );

    form.reset();
    setSelectedService("");
    setIsServiceOpen(false);

    window.setTimeout(() => {
      setFormStatus("idle");
      setFormMessage("");
    }, 5000);
  } catch (error) {
    setFormStatus("error");
    setFormMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-blue-600"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
       <a href="#hero" className="flex items-center gap-3">
<motion.div
  whileHover={{ rotate: -5, scale: 1.05 }}
  className="relative h-14 w-14 overflow-hidden rounded-2xl bg-transparent"
>
    <Image
      src="/logo.png"
      alt="TaskBridge Studio logo"
      fill
      className="object-contain p-1.5"
      priority
    />
  </motion.div>

  <div>
    <p className="text-base font-bold">TaskBridge Studio</p>
    <p className="text-xs text-slate-500">Admin & Operations Support</p>
  </div>
</a>

         <nav className="hidden items-center gap-12 text-sm font-medium text-slate-600 md:flex">
  <a href="#services" className="transition hover:text-slate-950">
    Services
  </a>

  <a href="#process" className="transition hover:text-slate-950">
    Process
  </a>

  <a href="#tools" className="transition hover:text-slate-950">
    Tools
  </a>
</nav>

      <motion.a
  whileHover={{ y: -2, scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
href="#contact"
  aria-label="Hire Support"
  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto sm:px-4 sm:py-2"
>
  <Headphones className="h-4 w-4" />
  <span className="ml-2 hidden sm:inline">Hire Support</span>
</motion.a>
        </div>
      </motion.header>

      {/* Marquee Strip */}
<section className="overflow-hidden border-b border-blue-700 bg-blue-600 py-2.5 text-white">
  <div className="marquee-wrap flex overflow-hidden">
    <div className="marquee-track flex min-w-max items-center">
      {[...marqueeItems, ...marqueeItems].map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex items-center text-sm font-bold uppercase tracking-[0.14em] md:text-base"
        >
          <span className={index % 2 === 0 ? "text-white" : "text-white/70"}>
            {item}
          </span>
          <span className="mx-4 text-white/60">|</span>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Hero */}
     <section
  id="hero"
  className="relative overflow-hidden border-b border-slate-200 bg-[#eef4fb]"
>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-200/60 blur-3xl"
        />
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="absolute right-0 top-24 h-96 w-96 rounded-full bg-cyan-100/80 blur-3xl"
        />
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-100/80 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Reliable support for busy founders and teams
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl"
            >
              Admin and operations support that keeps your business moving.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg"
            >
              TaskBridge Studio helps businesses stay organized with dependable
              inbox support, scheduling, research, documentation, spreadsheets,
              records, and tech-savvy admin assistance.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <Headphones className="h-4 w-4" />
                Get Support
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white"
              >
                <LayoutDashboard className="h-4 w-4 text-blue-600" />
                View Services
              </motion.a>
            </motion.div>

           
          </motion.div>

          {/* Right image layout */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            className="relative mx-auto w-full max-w-[650px]"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-white/40 blur-2xl" />

            <div className="relative grid items-stretch gap-5 sm:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-slate-300/60"
              >
                <Image
                  src="/hero.png"
                  alt="TaskBridge Studio admin support specialist"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              <div className="grid gap-5 self-center">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative min-h-[210px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-xl shadow-slate-300/50"
                >
                  <Image
                    src="/hero-side.png"
                    alt="Organized admin workspace"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[1.75rem] border border-white/10 bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/50"
                >
                  <p className="text-sm font-semibold text-blue-300">
                    Support Snapshot
                  </p>

                  <div className="mt-5 space-y-4">
                    {[
                      "Inbox follow-ups sent",
                      "Calendar updated",
                      "Weekly tracker cleaned",
                      "Client files organized",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-white/80"
                      >
                        <CheckCircle2 className="h-4 w-4 text-blue-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Moving Trust Strip */}
      {/* Trust Strip */}
<section className="relative overflow-hidden border-y border-blue-100 bg-[#eaf3ff]">
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={stagger}
    className="mx-auto grid max-w-7xl gap-4 px-6 py-8 text-center sm:grid-cols-2 lg:grid-cols-4"
  >
    {[
      {
        title: "Inbox & calendar",
        desc: "daily support",
        icon: Inbox,
      },
      {
        title: "Documents & records",
        desc: "organized clearly",
        icon: FileText,
      },
      {
        title: "Research & reports",
        desc: "prepared carefully",
        icon: Search,
      },
      {
        title: "Digital tools",
        desc: "used confidently",
        icon: LayoutDashboard,
      },
    ].map((item) => {
      const Icon = item.icon;

      return (
        <motion.div
          key={item.title}
          variants={fadeUp}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Icon className="h-5 w-5" />
          </div>

          <p className="mt-4 text-lg font-bold text-slate-950">
            {item.title}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {item.desc}
          </p>
        </motion.div>
      );
    })}
  </motion.div>
</section>

      {/* Services intro */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Services
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Support designed for growing businesses.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Practical support for operations, admin, and documentation —
            especially for teams that need someone dependable, organized, and
            comfortable with digital tools.
          </p>
        </motion.div>
      </section>

      {/* Image-led service rows */}
      <section className="mx-auto max-w-7xl space-y-12 px-6 pb-20">
        {[
          {
            image: "/side-admin.png",
            title: "Inbox, scheduling, and day-to-day coordination",
            description:
              "Keep your daily operations moving with support for inbox management, calendar coordination, reminders, follow-ups, and admin tasks that tend to pile up.",
            icon: CalendarDays,
            bullets: [
              "Email triage and organization",
              "Meeting and appointment coordination",
              "Reminders and follow-up support",
              "Daily admin task handling",
            ],
          },
          {
            image: "/service-doc.png",
            title: "Documentation, spreadsheets, and business records",
            description:
              "Get clean, structured support for trackers, reports, records, files, agreements, internal documentation, and spreadsheet-based workflows.",
            icon: FileText,
            reverse: true,
            bullets: [
              "Spreadsheet cleanup and updating",
              "Document preparation and formatting",
              "Accurate record keeping",
              "Reports and tracker maintenance",
            ],
          },
          {
            image: "/service-ops.png",
            title: "Tech-savvy support for modern business tools",
            description:
              "Ideal for founders and teams using CRMs, dashboards, forms, digital tools, project boards, and backend-connected business systems.",
            icon: LayoutDashboard,
            bullets: [
              "Dashboard and CRM updates",
              "Research and structured data gathering",
              "Form and workflow support",
              "General digital operations assistance",
            ],
          },
        ].map((service) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="grid items-center gap-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition lg:grid-cols-2 lg:p-8"
            >
              <div
                className={[
                  "relative min-h-[340px] overflow-hidden rounded-[1.5rem]",
                  service.reverse ? "order-1 lg:order-2" : "",
                ].join(" ")}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className={service.reverse ? "order-2 lg:order-1" : ""}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-3xl font-bold">{service.title}</h3>
                <p className="mt-4 leading-8 text-slate-600">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Why choose */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              Why choose TaskBridge
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Support that understands both admin work and systems.
            </h2>
            <p className="mt-5 leading-8 text-white/65">
              TaskBridge is built for businesses that need more than basic
              admin help — someone dependable, organized, and comfortable
              working with digital tools, workflows, and structured information.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {whyItems.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Process
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Simple and easy to work with.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 grid gap-5 md:grid-cols-4"
        >
          {processItems.map(([num, title, desc]) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-blue-600">{num}</p>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Tools */}
      <section id="tools" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Tools
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Comfortable with modern business tools.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              From spreadsheets and documents to design tools, team
              communication, project boards, and CRM workflows.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.name}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <Icon className={`h-6 w-6 ${tool.className}`} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {tool.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {tool.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
<section className="mx-auto max-w-7xl px-6 py-20">
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={scaleIn}
    className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-blue-600 p-8 text-white md:p-12 lg:grid-cols-[0.95fr_1.05fr]"
  >
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
        Ready to delegate?
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
        Get reliable support for your daily operations.
      </h2>

      <p className="mt-4 max-w-2xl leading-8 text-blue-50">
        From admin tasks and documentation to inbox, research, scheduling, and
        digital workflow support — TaskBridge Studio helps businesses stay
        organized and move faster.
      </p>

      <motion.a
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
       href="#contact"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
      >
        Start Today
        <ArrowRight className="h-4 w-4" />
      </motion.a>
    </div>

    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/20 bg-blue-500/40 shadow-2xl shadow-blue-950/20"
    >
      <Image
        src="/cta.png"
        alt="TaskBridge Studio support workspace"
        fill
        className="object-cover"
      />
    </motion.div>
  </motion.div>
</section>

{/* Contact Form */}
<section id="contact" className="mx-auto max-w-7xl px-6 py-20">
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={scaleIn}
    className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
  >
    <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
      {/* Left panel */}
      <div className="relative overflow-hidden bg-slate-950 p-8 text-white md:p-12">
        <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            Start Here
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Tell us what support you need.
          </h2>

          <p className="mt-5 leading-8 text-white/65">
            Send a quick message about your admin, documentation, scheduling,
            research, or workflow support needs. Your inquiry will be saved,
            sent to our inbox, and followed up automatically.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Stored securely in our lead tracker",
              "Instant email notification sent",
              "Auto-reply confirmation to client",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/75">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-blue-300">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#f8fafc] p-6 md:p-10">
        <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Your name
              </label>
              <input
                name="name"
                required
                disabled={isSubmitting}
                placeholder="Alysa Emilio"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>
             <input
  name="email"
  type="email"
  disabled={isSubmitting}
  placeholder="name@email.com"
  onChange={() => clearFieldError("email")}
  className={getFieldClass("email")}
/>
{errors.email && (
  <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>
)}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Company / business name
            </label>
            <input
              name="company"
              disabled={isSubmitting}
              placeholder="Your company name"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Service needed
  </label>

  <div className="relative">
    <input type="hidden" name="service" value={selectedService} />

    <button
      type="button"
      disabled={isSubmitting}
      onClick={() => {
        setIsServiceOpen((prev) => !prev);
        clearFieldError("service");
      }}
      className={[
        "flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60",
        errors.service
          ? "border-red-400 text-slate-950 ring-4 ring-red-100"
          : "border-slate-200 text-slate-950 focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
      ].join(" ")}
    >
      <span className={selectedService ? "text-slate-950" : "text-slate-400"}>
        {selectedService || "Select a service"}
      </span>

      <svg
        className={[
          "h-4 w-4 text-slate-500 transition",
          isServiceOpen ? "rotate-180" : "",
        ].join(" ")}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>

    {isServiceOpen && (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/80"
      >
        {serviceOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setSelectedService(option);
              setIsServiceOpen(false);
              clearFieldError("service");
            }}
            className={[
              "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition",
              selectedService === option
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-blue-50 hover:text-blue-700",
            ].join(" ")}
          >
            {option}

            {selectedService === option && (
              <CheckCircle2 className="h-4 w-4" />
            )}
          </button>
        ))}
      </motion.div>
    )}
  </div>

  {errors.service && (
    <p className="mt-2 text-xs font-medium text-red-600">{errors.service}</p>
  )}
</div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Budget / hours needed
              </label>
              <input
                name="budget"
                disabled={isSubmitting}
                placeholder="Example: 5 hours/week"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Message
            </label>
           <textarea
  name="message"
  rows={5}
  disabled={isSubmitting}
  placeholder="Tell us more about the support you need..."
  onChange={() => clearFieldError("message")}
  className={[
    getFieldClass("message"),
    "resize-none",
  ].join(" ")}
/>
{errors.message && (
  <p className="mt-2 text-xs font-medium text-red-600">{errors.message}</p>
)}
          </div>

          {formStatus !== "idle" && (
            <div
              className={[
                "flex items-start gap-3 rounded-2xl border p-4 text-sm",
                formStatus === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-800",
              ].join(" ")}
            >
              {formStatus === "success" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <p>{formMessage}</p>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { y: -2, scale: 1.01 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            className="inline-flex w-full items-center cursor-pointer justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending inquiry...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 cursor-pointer" />
                Send Inquiry
              </>
            )}
          </motion.button>

          <p className="text-center text-xs leading-5 text-slate-500">
            By submitting, your inquiry will be processed through our TaskBridge
            automation workflow.
          </p>
        </form>
      </div>
    </div>
  </motion.div>
</section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="border-t border-slate-200 bg-slate-950 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
             <div className="flex items-center gap-3">
 <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-transparent">
    <Image
      src="/logo.png"
      alt="TaskBridge Studio logo"
      fill
      className="object-contain p-1.5"
    />
  </div>

  <div>
    <p className="text-base font-bold">TaskBridge Studio</p>
    <p className="text-xs text-white/50">Admin & Operations Support</p>
  </div>
</div>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
                Reliable admin, documentation, research, scheduling, and
                tech-savvy operations support for busy founders, teams, and
                growing businesses.
              </p>

              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
               href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
              >
                Hire Support
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                Explore
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <a
                  href="#services"
                  className="block text-white/65 transition hover:text-white"
                >
                  Services
                </a>
                <a
                  href="#process"
                  className="block text-white/65 transition hover:text-white"
                >
                  Process
                </a>
                <a
                  href="#tools"
                  className="block text-white/65 transition hover:text-white"
                >
                  Tools
                </a>
                <a
                  href="#contact"
                  className="block text-white/65 transition hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                Contact
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/65">
                <p>Available for remote admin and operations support.</p>

                <a
                  href="mailto:alysaemilio@gmail.com"
                  className="block transition hover:text-white"
                >
                  alysaemilio@gmail.com
                </a>

                <p>Based in the Philippines</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} TaskBridge Studio. All rights
              reserved.
            </p>

            <p>Built for organized, reliable, tech-savvy business support.</p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}