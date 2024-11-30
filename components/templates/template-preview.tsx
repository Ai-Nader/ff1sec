import Image from "next/image"
import { Template } from "@/types/template"

interface TemplatePreviewProps {
  template: Template
  showPreview?: boolean
}

export function TemplatePreview({ template, showPreview = false }: TemplatePreviewProps) {
  const imageSrc = showPreview ? (template.preview || template.image) : template.image
  const altText = showPreview ? `${template.title} Preview` : template.title

  return (
    <div className="aspect-video relative overflow-hidden rounded-lg">
      <Image
        src={imageSrc}
        alt={altText}
        fill
        className="object-cover"
        priority={!showPreview}
      />
    </div>
  )
}