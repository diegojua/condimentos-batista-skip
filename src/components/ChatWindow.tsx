import { useState } from 'react'
import { Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LiveChatMessage } from '@/types'
import { cn } from '@/lib/utils'

interface ChatWindowProps {
  onClose: () => void
}

export const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<LiveChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'Olá! Como posso ajudar você hoje?',
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() === '') return
    const userMessage: LiveChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    }
    setMessages([...messages, userMessage])
    setInput('')
    // Simulate agent response
    setTimeout(() => {
      const agentResponse: LiveChatMessage = {
        id: String(Date.now() + 1),
        sender: 'agent',
        text: 'Obrigado por sua mensagem. Um de nossos atendentes responderá em breve.',
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, agentResponse])
    }, 1500)
  }

  return (
    <div className="fixed bottom-24 right-4 w-80 h-[28rem] bg-card border rounded-lg shadow-xl flex flex-col animate-fade-in-up">
      <header className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://img.usecurling.com/i?q=spice" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">Fale Conosco</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </header>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                msg.sender === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <p
                className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted',
                )}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="p-3 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
