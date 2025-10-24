"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Upload, Save, Loader2, ImageIcon } from "lucide-react"

export default function BannersPage() {
  const pageOptions = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "services", label: "Services" },
    { key: "contact", label: "Contact" },
  ]

  const [pageKey, setPageKey] = useState<string>("home")
  const [status, setStatus] = useState<string>("active")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [heading, setHeading] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const fetchBanner = async (key: string) => {
    try {
      setLoading(true)
      const res = await axios.get(`/api/admin/banners/${encodeURIComponent(key)}`)
      if (res.data?.success && res.data.data) {
        const b = res.data.data as { image: string; status?: string; title?: string; heading?: string; description?: string }
        setImageUrl(b.image || "")
        setStatus(b.status || "active")
        setTitle(b.title || "")
        setHeading(b.heading || "")
        setDescription(b.description || "")
      } else {
        setImageUrl("")
        setStatus("active")
        setTitle("")
        setHeading("")
        setDescription("")
      }
    } catch (e) {
      setImageUrl("")
      setStatus("active")
      setTitle("")
      setHeading("")
      setDescription("")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanner(pageKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey])

  const onChooseImage = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f || null)
    if (f) {
      setImageUrl(URL.createObjectURL(f))
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem("admin_token")
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again to continue.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      const form = new FormData()
      form.append("pageKey", pageKey)
      form.append("status", status)
      form.append("title", title)
      form.append("heading", heading)
      form.append("description", description)
      if (imageUrl && !file) {
        form.append("existingImage", imageUrl)
      }
      if (file) {
        form.append("image", file)
      }

      const res = await axios.post(`/api/admin/banners`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data?.success) {
        toast({ title: "Saved", description: "Banner saved successfully." })
        fetchBanner(pageKey)
        setFile(null)
      } else {
        toast({
          title: "Error",
          description: res.data?.message || "Failed to save banner",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || err?.message || "Failed to save banner",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-admin-gradient bg-clip-text text-transparent">Banner Manager</h1>
          <p className="text-gray-600 mt-1">Manage hero banners for each page</p>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Page and Status Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Page</Label>
                  <Select value={pageKey} onValueChange={(v) => setPageKey(v)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Page" />
                    </SelectTrigger>
                    <SelectContent>
                      {pageOptions.map((p) => (
                        <SelectItem key={p.key} value={p.key}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-semibold">Status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Content Fields */}
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Title (Optional)</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Banner title/subtitle"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Small text that appears above the main heading</p>
                </div>

                <div>
                  <Label className="font-semibold">Main Heading (H1)</Label>
                  <Input
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Main banner heading"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Primary heading displayed on the banner</p>
                </div>

                <div>
                  <Label className="font-semibold">Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Banner description text"
                    rows={4}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Descriptive text below the heading</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" onClick={onChooseImage} className="bg-admin-gradient text-white">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                  <Button type="button" onClick={handleSave} disabled={loading} className="bg-admin-gradient text-white">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Banner
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Tip: If you don't select a new image, the existing banner image will be kept.
                </p>
              </div>
             {/*  <p className="text-xs text-gray-500">
                Tip: If you don’t select a new image, the existing banner image will be kept.
              </p> */}
            </div>

            <div>
              <Label className="font-semibold">Preview</Label>
              <div className="mt-2 relative w-full h-80 rounded-lg overflow-hidden bg-gray-100 border">
                {imageUrl ? (
                  <>
                    <Image src={imageUrl || "/placeholder.svg"} alt={pageKey} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                    {pageKey ? (
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2 text-xs">
                          {pageOptions.find((p) => p.key === pageKey)?.label} Page Banner
                        </Badge>
                        {title && (
                          <p className="text-white/90 text-xs mb-1">
                            {title}
                          </p>
                        )}
                        {heading && (
                          <h1 className="text-white text-lg font-bold mb-2 line-clamp-2">
                            {heading}
                          </h1>
                        )}
                        {description && (
                          <p className="text-white/90 text-sm line-clamp-3">
                            {description}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="h-8 w-8 mb-2" />
                    No image selected
                  </div>
                )}
              </div>

              {/* Image Resolution Guidelines */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <div className="flex items-start gap-3">
                  <ImageIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Recommended Image Specifications</h4>
                    <div className="space-y-1 text-xs text-blue-800">
                      <p><strong>Desktop:</strong> 1920 x 1080px (16:9 ratio) - Full HD</p>
                      <p><strong>Mobile:</strong> 768 x 1024px (3:4 ratio) - Portrait</p>
                      <p><strong>File Size:</strong> Maximum 2MB for optimal loading</p>
                      <p><strong>Format:</strong> JPG, PNG, or WebP recommended</p>
                    </div>
                    <p className="text-xs text-blue-700 mt-2 font-medium">
                      💡 Tip: Use high-quality images with good contrast for text overlay readability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
