import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Template } from "@/types/template"
import { TemplatePreview } from "./template-preview"
import { FeatureList } from "./feature-list"

interface TemplateContentProps {
  template: Template
}

export function TemplateContent({ template }: TemplateContentProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      <TemplatePreview template={template} />

      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{template.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{template.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {template.recommendedFor.map((industry) => (
            <Badge key={industry} variant="secondary" className="text-sm">
              {industry}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="w-full justify-start" aria-label="Template details">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="space-y-6">
          <div className="mt-6">
            <FeatureList features={template.features} />
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <div className="mt-6">
            <TemplatePreview template={template} showPreview />
          </div>
        </TabsContent>
        <TabsContent value="documentation">
          <div className="prose prose-neutral dark:prose-invert max-w-none mt-6" role="article">
            <h3>Getting Started</h3>
            <p>Follow these steps to get started with your template:</p>
            <ol>
              <li>Purchase and download the template</li>
              <li>Follow the installation guide</li>
              <li>Customize to your needs</li>
              <li>Launch and enjoy!</li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}