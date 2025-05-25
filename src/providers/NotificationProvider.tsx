"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, MessageSquare, AlertCircle, Info, CheckCircle } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info" | "feedback"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionLabel?: string
  feedbackId?: string
  priority?: "low" | "medium" | "high"
  autoClose?: boolean
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [toasts, setToasts] = useState<Notification[]>([])

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random feedback updates
      if (Math.random() > 0.7) {
        const feedbackNotifications = [
          {
            type: "feedback" as const,
            title: "Feedback Response Received",
            message: "Your bug report about upload issues has been resolved",
            priority: "medium" as const,
            autoClose: false,
            feedbackId: "bug-001",
            actionUrl: "/feedback",
            actionLabel: "View Response",
          },
          {
            type: "success" as const,
            title: "Feature Request Update",
            message: "Your suggestion for more ENT conditions is now in development",
            priority: "low" as const,
            autoClose: true,
            duration: 5000,
            feedbackId: "feature-002",
          },
          {
            type: "info" as const,
            title: "Feedback Status Update",
            message: "Your general feedback is now being reviewed by our team",
            priority: "low" as const,
            autoClose: true,
            duration: 4000,
          },
        ]

        const randomNotification = feedbackNotifications[Math.floor(Math.random() * feedbackNotifications.length)]
        addNotification(randomNotification)
      }
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Add to toasts if it should auto-close or is high priority
    if (notification.autoClose || notification.priority === "high") {
      setToasts((prev) => [newNotification, ...prev])

      // Auto-remove toast
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newNotification.id))
      }, notification.duration || 5000)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
    setToasts([])
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        unreadCount,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeNotification} />
    </NotificationContext.Provider>
  )
}

// Toast Container Component
function ToastContainer({ toasts, removeToast }: { toasts: Notification[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} notification={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Individual Toast Component
function Toast({ notification, onRemove }: { notification: Notification; onRemove: () => void }) {
  const getToastIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />
      case "feedback":
        return <MessageSquare className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getToastColor = () => {
    switch (notification.type) {
      case "success":
        return "border-green-500/20 bg-green-500/5"
      case "error":
        return "border-red-500/20 bg-red-500/5"
      case "warning":
        return "border-yellow-500/20 bg-yellow-500/5"
      case "info":
        return "border-blue-500/20 bg-blue-500/5"
      case "feedback":
        return "border-purple-500/20 bg-purple-500/5"
      default:
        return "border-border bg-card"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`glass-card rounded-xl p-4 border ${getToastColor()} shadow-lg max-w-sm`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{getToastIcon()}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          {notification.actionLabel && notification.actionUrl && (
            <button className="text-xs text-primary hover:text-primary/80 transition-colors mt-2">
              {notification.actionLabel}
            </button>
          )}
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
