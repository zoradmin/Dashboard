import type React from "react"
import { Bot, Box, Database, Lock, RefreshCw, Send, Server, Shield, Terminal, UserPlus } from "lucide-react"

const AIPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Playground</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Common Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CommandCard icon={<Send />} title="Send Message" description="Send a message to the AI model." />
          <CommandCard icon={<Bot />} title="Create Bot" description="Create a new AI bot." />
          <CommandCard icon={<RefreshCw />} title="Refresh" description="Refresh the AI model." />
          <CommandCard icon={<Database />} title="Database Query" description="Query the database." />
          <CommandCard icon={<Server />} title="Server Status" description="Check the server status." />
          <CommandCard icon={<UserPlus />} title="Add User" description="Add a new user." />
          <CommandCard icon={<Lock />} title="Lock" description="Lock the AI model." />
          <CommandCard icon={<Shield />} title="Shield" description="Activate security shield." />
          <CommandCard icon={<Terminal />} title="Terminal" description="Open the terminal." />
          <CommandCard icon={<Box />} title="Box" description="Open the box." />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">AI Model Interaction</h2>
        {/* Add AI model interaction components here */}
        <p>This section will contain components for interacting with the AI model.</p>
      </section>
    </div>
  )
}

interface CommandCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const CommandCard: React.FC<CommandCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}

export default AIPage
