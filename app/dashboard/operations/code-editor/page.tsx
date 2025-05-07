"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCode, History, RefreshCw, Save } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function CodeEditorPage() {
  const searchParams = useSearchParams()
  const serverParam = searchParams.get("server")

  const [selectedServer, setSelectedServer] = useState(serverParam || "web-01")
  const [selectedFile, setSelectedFile] = useState("/etc/nginx/nginx.conf")
  const [fileContent, setFileContent] = useState(`# /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
    # multi_accept on;
}

http {
    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    # server_tokens off;

    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # Logging Settings
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip Settings
    gzip on;

    # Virtual Host Configs
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}`)

  const files = {
    "web-01": ["/etc/nginx/nginx.conf", "/etc/nginx/sites-available/default", "/etc/ssh/sshd_config", "/etc/fstab"],
    "db-01": [
      "/etc/postgresql/13/main/postgresql.conf",
      "/etc/postgresql/13/main/pg_hba.conf",
      "/etc/ssh/sshd_config",
      "/etc/fstab",
    ],
    "validator-01": [
      "/etc/systemd/system/geth.service",
      "/etc/systemd/system/prysm.service",
      "/etc/ssh/sshd_config",
      "/etc/fstab",
    ],
    "cache-01": ["/etc/redis/redis.conf", "/etc/memcached.conf", "/etc/ssh/sshd_config", "/etc/fstab"],
  }

  const handleServerChange = (value: string) => {
    setSelectedServer(value)
    setSelectedFile(files[value as keyof typeof files][0])
    // In a real app, we would fetch the file content here
    setFileContent(`# This is the content of ${files[value as keyof typeof files][0]} on ${value}`)
  }

  const handleFileChange = (value: string) => {
    setSelectedFile(value)
    // In a real app, we would fetch the file content here
    setFileContent(`# This is the content of ${value} on ${selectedServer}`)
  }

  const handleSave = () => {
    // In a real app, we would save the file content here
    alert(`File ${selectedFile} saved successfully!`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Code Editor</h1>
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
        </div>
      </div>

      <Card className="h-[calc(100vh-240px)] flex flex-col">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Edit Configuration
            </CardTitle>
            <CardDescription>Editing files on {selectedServer}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <Tabs defaultValue="editor" className="flex flex-col h-full">
            <div className="border-b px-4">
              <TabsList className="w-full justify-start h-10">
                <TabsTrigger value="editor" className="data-[state=active]:bg-background">
                  <FileCode className="mr-2 h-4 w-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-background">
                  <History className="mr-2 h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="editor" className="flex-1 flex flex-col p-0 m-0">
              <div className="border-b p-2 flex items-center">
                <Select value={selectedFile} onValueChange={handleFileChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select file" />
                  </SelectTrigger>
                  <SelectContent>
                    {files[selectedServer as keyof typeof files].map((file) => (
                      <SelectItem key={file} value={file}>
                        {file}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 p-0 overflow-auto bg-[#1e1e1e]">
                <textarea
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm bg-[#1e1e1e] text-gray-200 focus:outline-none resize-none leading-relaxed"
                  style={{
                    backgroundImage: "linear-gradient(transparent 50%, rgba(100, 100, 100, 0.1) 50%)",
                    backgroundSize: "100% 2.5em",
                    backgroundAttachment: "local",
                    lineHeight: "1.25em",
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="history" className="p-4 m-0">
              <div className="space-y-4">
                <h3 className="font-medium">File Revision History</h3>
                <div className="space-y-2">
                  {[
                    { date: "May 6, 2025 14:30", user: "admin", message: "Updated server configuration" },
                    { date: "May 5, 2025 10:15", user: "system", message: "Security update" },
                    { date: "May 3, 2025 09:45", user: "admin", message: "Initial configuration" },
                  ].map((revision, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                      <div>
                        <div className="font-medium">{revision.date}</div>
                        <div className="text-sm text-muted-foreground">
                          {revision.user} - {revision.message}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Restore
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
