import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TextToSpeech from "@/components/TextToSpeech";
import ScrollToTop from "@/components/ScrollToTop";

interface ArticleLayoutProps {
  title: string;
  subtitle: string;
  backTo: string;
  backLabel: string;
  icon?: ReactNode;
  children: ReactNode;
  hideTextToSpeech?: boolean;
  cta?: {
    title: string;
    description: string;
    linkTo: string;
    linkLabel: string;
  };
  maxWidth?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const ArticleLayout = ({
  title,
  subtitle,
  backTo,
  backLabel,
  icon,
  children,
  hideTextToSpeech = false,
  cta,
  maxWidth = "max-w-4xl",
}: ArticleLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1" id="article-content">
        {/* Hero */}
        <section className="article-hero py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <Link
                to={backTo}
                className="inline-flex items-center gap-2 text-sm font-body font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-10"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backLabel}
              </Link>
            </motion.div>
            <div className="mx-auto max-w-3xl text-center">
              {icon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease }}
                  className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary"
                >
                  {icon}
                </motion.div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
                className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-[3.5rem] leading-[1.1]"
              >
                {title}
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.35, ease }}
                className="article-accent-line mt-8"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                className="mt-8 text-base text-muted-foreground leading-relaxed md:text-lg font-body font-light max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
              {!hideTextToSpeech && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55, ease }}
                  className="mt-6"
                >
                  <TextToSpeech contentSelector="#article-content" />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className={`container ${maxWidth}`}>
            {children}
          </div>
        </section>

        {/* CTA */}
        {cta && (
          <section className="pb-16 md:pb-24">
            <div className="container max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease }}
                className="article-cta rounded-sm p-10 md:p-14 text-center"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {cta.title}
                </h2>
                <p className="mt-4 text-muted-foreground font-body font-light max-w-xl mx-auto">
                  {cta.description}
                </p>
                <Link
                  to={cta.linkTo}
                  className="mt-8 inline-flex items-center justify-center bg-primary px-10 py-3 text-xs font-body font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {cta.linkLabel}
                </Link>
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default ArticleLayout;
