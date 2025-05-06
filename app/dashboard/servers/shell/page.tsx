"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function ShellPage() {
  const [selectedServer, setSelectedServer] = useState("web-01")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Connected to web-01 (192.168.1.101)",
    "Last login: Wed May 6 13:45:10 2025 from 10.0.0.5",
    "admin@web-01:~$ ",
  ])
  const [input, setInput] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  const handleServerChange = (value: string) => {
    setSelectedServer(value)
    const serverIp = {
      "web-01": "192.168.1.101",
      "db-01": "192.168.1.102",
      "validator-01": "192.168.1.103",
      "cache-01": "192.168.1.104",
    }[value]

    setTerminalOutput([
      `Connected to ${value} (${serverIp})`,
      `Last login: Wed May 6 13:45:10 2025 from 10.0.0.5`,
      `admin@${value}:~$ `,
    ])
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add the command to the terminal output
    setTerminalOutput([...terminalOutput, input])

    // Simulate command execution
    setTimeout(() => {
      let response: string[] = []

      switch (input.trim()) {
        case "ls":
          response = ["Documents  Downloads  projects  scripts  config.json"]
          break
        case "pwd":
          response = ["/home/admin"]
          break
        case "whoami":
          response = ["admin"]
          break
        case "date":
          response = [new Date().toString()]
          break
        case "uptime":
          response = [" 13:45:10 up 42 days, 5:27, 2 users, load average: 0.08, 0.12, 0.10"]
          break
        case "clear":
          setTerminalOutput([`admin@${selectedServer}:~$ `])
          setInput("")
          return
        default:
          response = [`Command not found: ${input}`]
      }

      setTerminalOutput([...terminalOutput, input, ...response, `admin@${selectedServer}:~$ `])
      setInput("")
    }, 300)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Linux Shell</h1>
        <div className="flex items-center space-x-2">
          <Select value={selectedServer} onValueChange={handleServerChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select server" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-01">web-01</SelectItem>
              <SelectItem value="db-01">db-01</SelectItem>
              <SelectItem value="validator-01">validator-01</SelectItem>
              <SelectItem value="cache-01">cache-01</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleServerChange(selectedServer)}>
            Reconnect
          </Button>
        </div>
      </div>

      <Card className="h-[calc(100vh-240px)] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle>Terminal</CardTitle>
          <CardDescription>Connected to {selectedServer}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div ref={terminalRef} className="flex-1 bg-black text-green-400 font-mono p-4 rounded-md overflow-auto">
            {terminalOutput.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
          <form onSubmit={handleCommand} className="mt-4 flex">
            <span className="bg-black text-green-400 font-mono p-2 rounded-l-md">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black text-green-400 font-mono p-2 rounded-r-md focus:outline-none"
              autoFocus
            />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
