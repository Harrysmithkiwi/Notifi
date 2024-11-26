'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

// Mock API function
const fetchAssessments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Project A', status: 'In Progress', lastUpdated: '2023-06-01' },
        { id: 2, name: 'Project B', status: 'Completed', lastUpdated: '2023-05-28' },
        { id: 3, name: 'Project C', status: 'Not Started', lastUpdated: '2023-06-02' },
      ])
    }, 1000)
  })
}

export default function Dashboard() {
  const [assessments, setAssessments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const data = await fetchAssessments()
        setAssessments(data)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load assessments')
        setIsLoading(false)
      }
    }

    loadAssessments()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Impact Assessment Dashboard</CardTitle>
        <CardDescription>Overview of your Privacy Impact Assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="mb-4">New Assessment</Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                </TableRow>
              ))
            ) : (
              assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>{assessment.name}</TableCell>
                  <TableCell>{assessment.status}</TableCell>
                  <TableCell>{assessment.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
