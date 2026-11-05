import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/data"
import { CaseStudyUI } from "@/components/case-study-ui"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    return {
      title: "Case Study Not Found",
      description: "This case study could not be found.",
    }
  }

  return {
    title: `${study.clientName} Case Study | FuelMails`,
    description: study.excerpt,
    openGraph: {
      title: `${study.clientName} Case Study`,
      description: study.excerpt,
      images: [
        {
          url: study.imageUrl,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
  }
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    notFound()
  }

  return <CaseStudyUI study={study} />
}
