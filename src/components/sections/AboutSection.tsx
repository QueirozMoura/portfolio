import { BrainCircuit, CloudCog } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { SectionTitle } from "../ui/SectionTitle";
import euProfissional from "../../assets/eu-profissional-3 (1).png";

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="System Core"
          subtitle="System Core
          Desenvolvedor Full Stack apaixonado por tecnologia, interfaces modernas e inteligência artificial. Meu foco é construir aplicações escaláveis, performáticas e visualmente marcantes que unem engenharia de software e experiência do usuário."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="glass-card overflow-hidden p-0">
            <img
              src={euProfissional}
              alt="Retrato profissional de Gustavo Moura"
              className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
            />
          </div>

          <div className="grid gap-6">
            <GlassCard>
              <div className="mb-3 inline-flex rounded-lg bg-secondary/10 p-2 text-secondary">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-onSurface">
                Cognitive Systems
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-onSurfaceVariant">
                Desenvolvimento de soluções com IA, integração de LLMs e
                automações inteligentes para otimizar processos e criar
                experiências digitais mais eficientes.
              </p>
            </GlassCard>

            <GlassCard>
              <div className="mb-3 inline-flex rounded-lg bg-secondary/10 p-2 text-secondary">
                <CloudCog className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-onSurface">
                Cloud Ready
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-onSurfaceVariant">
                Infraestruturas modernas e escaláveis com foco em performance, estabilidade e alta disponibilidade.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
