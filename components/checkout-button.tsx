"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface CheckoutButtonProps {
  templateId: string
  price: number
}

export function CheckoutButton({ templateId, price }: CheckoutButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const validateTemplateId = (id: string): { templateId: string; tier: string } | null => {
    const [templateId, tier] = id.split('-')
    if (!templateId || !tier) {
      return null
    }
    return { templateId, tier }
  }

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      
      const parsed = validateTemplateId(templateId)
      if (!parsed) {
        throw new Error('Invalid template format')
      }

      const result = addItem(parsed.templateId, parsed.tier as any)
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to add item to cart')
      }

      toast({
        title: "Template added to cart",
        description: "Successfully added to your cart",
        variant: "default",
      })
    } catch (error) {
      console.error('Cart error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      size="lg" 
      onClick={handleAddToCart}
      className="w-full"
      disabled={loading}
    >
      {loading ? "Adding to cart..." : `Add to Cart • $${price}`}
    </Button>
  )
}