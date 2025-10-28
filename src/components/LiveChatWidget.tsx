import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatWindow } from './ChatWindow'

export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg btn-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <MessageSquare className="h-8 w-8" />
          )}
        </Button>
      </div>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  )
}
