'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function BriefPrivacyAnalysis() {
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    existingSystems: '',
    proposedChanges: '',
    purpose: '',
    projectedBenefits: '',
    stakeholders: '',
    personalInfo: [{ type: '', source: '', purpose: '' }],
    privacyRisks: {
      newCollection: false,
      newUse: false,
      disclosure: false,
      storage: false,
      retention: false,
      other: false
    },
    isPIARequired: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePersonalInfoChange = (index: number, field: string, value: string) => {
    const updatedPersonalInfo = [...formData.personalInfo]
    updatedPersonalInfo[index] = { ...updatedPersonalInfo[index], [field]: value }
    setFormData(prev => ({ ...prev, personalInfo: updatedPersonalInfo }))
  }

  const addPersonalInfoRow = () => {
    setFormData(prev => ({
      ...prev,
      personalInfo: [...prev.personalInfo, { type: '', source: '', purpose: '' }]
    }))
  }

  const handlePrivacyRiskChange = (risk: string) => {
    setFormData(prev => ({
      ...prev,
      privacyRisks: { ...prev.privacyRisks, [risk]: !prev.privacyRisks[risk as keyof typeof prev.privacyRisks] }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send this data to your backend
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Brief Privacy Analysis</CardTitle>
        <CardDescription>Complete this form to conduct a brief privacy analysis for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="projectName">Project Name</Label>
            <Input id="projectName" name="projectName" value={formData.projectName} onChange={handleInputChange} />
          </div>

          <div>
            <Label htmlFor="projectDescription">Project Description</Label>
            <Textarea id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} />
          </div>

          <div>
            <Label htmlFor="existingSystems">Existing Systems</Label>
            <Textarea id="existingSystems" name="existingSystems" value={formData.existingSystems} onChange={handleInputChange} />
          </div>

          <div>
            <Label htmlFor="proposedChanges">Proposed Changes</Label>
            <Textarea id="proposedChanges" name="proposedChanges" value={formData.proposedChanges} onChange={handleInputChange} />
          </div>

          <div>
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea id="purpose" name="purpose" value={formData.purpose} onChange={handleInputChange} />
          </div>

          <div>
            <Label htmlFor="projectedBenefits">Projected Benefits</Label>
            <Textarea id="projectedBenefits" name="projectedBenefits" value={formData.projectedBenefits} onChange={handleInputChange} />
          </div>

          <div>
            <Label htmlFor="stakeholders">Stakeholders</Label>
            <Textarea id="stakeholders" name="stakeholders" value={formData.stakeholders} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Personal Information Involved</Label>
            {formData.personalInfo.map((info, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mt-2">
                <Input
                  placeholder="Type of Personal Information"
                  value={info.type}
                  onChange={(e) => handlePersonalInfoChange(index, 'type', e.target.value)}
                />
                <Input
                  placeholder="Source of Information"
                  value={info.source}
                  onChange={(e) => handlePersonalInfoChange(index, 'source', e.target.value)}
                />
                <Input
                  placeholder="Purpose"
                  value={info.purpose}
                  onChange={(e) => handlePersonalInfoChange(index, 'purpose', e.target.value)}
                />
              </div>
            ))}
            <Button type="button" onClick={addPersonalInfoRow} className="mt-2">Add Row</Button>
          </div>

          <div>
            <Label>Privacy Risks</Label>
            {Object.entries(formData.privacyRisks).map(([risk, value]) => (
              <div key={risk} className="flex items-center space-x-2">
                <Checkbox
                  id={risk}
                  checked={value}
                  onCheckedChange={() => handlePrivacyRiskChange(risk)}
                />
                <label htmlFor={risk}>{risk.charAt(0).toUpperCase() + risk.slice(1).replace(/([A-Z])/g, ' $1')}</label>
              </div>
            ))}
          </div>

          <div>
            <Label>Is a full Privacy Impact Assessment (PIA) required?</Label>
            <RadioGroup value={formData.isPIARequired} onValueChange={(value) => setFormData(prev => ({ ...prev, isPIARequired: value }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pia-yes" />
                <Label htmlFor="pia-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pia-no" />
                <Label htmlFor="pia-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit">Submit Brief Privacy Analysis</Button>
        </form>
      </CardContent>
    </Card>
  )
}
