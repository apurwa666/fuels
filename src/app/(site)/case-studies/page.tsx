
import Image from "next/image"
import Link from "next/link"
import { caseStudies } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionWrapper } from "@/components/motion-wrapper"
import { FADE_IN_UP, STAGGER_CONTAINER } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function CaseStudiesPage() {
  return (
    <div className="container py-12 sm:py-24">
      <MotionWrapper variants={FADE_IN_UP} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-[10px] uppercase tracking-widest mb-4">
          Success Stories
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight uppercase">
          Proof Driven by <span className="text-accent italic">Execution.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground font-medium">
          Detailed breakdowns of how we build high-performance marketing systems for global brands and nonprofits.
        </p>
      </MotionWrapper>

      <MotionWrapper variants={STAGGER_CONTAINER} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {caseStudies.map((study) => (
          <MotionWrapper variants={FADE_IN_UP} key={study.id}>
            <Link href={`/case-studies/${study.slug}`} className="group block h-full">
              <Card className="h-full flex flex-col overflow-hidden bg-card/40 border-white/5 transition-all hover:border-accent/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(108,124,240,0.15)] rounded-3xl">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={study.imageUrl}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="case study cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-6 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-accent/20 backdrop-blur-md border-accent/30 text-accent font-bold">
                      {study.industry}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-bold font-headline group-hover:text-accent transition-colors leading-tight mb-4">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground line-clamp-3 font-medium">
                    {study.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto p-8 pt-0 border-t border-white/5 bg-white/[0.02]">
                  <div className="flex w-full items-center justify-between mt-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Impact</span>
                      <span className="text-lg font-black text-white">{study.lift}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </MotionWrapper>
        ))}
      </MotionWrapper>
    </div>
  )
}
