"use client";
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconCircleX,
  IconLoader,
} from "@tabler/icons-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <IconCircleCheck className="h-5 w-5 text-green-500" />,
        info: <IconInfoCircle className="h-5 w-5 text-blue-500" />,
        warning: <IconAlertTriangle className="h-5 w-5 text-amber-500" />,
        error: <IconCircleX className="h-5 w-5 text-red-500" />,
        loading: <IconLoader className="h-5 w-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-500",
          actionButton:
            "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500",
          success: "!bg-green-50 !border-green-200 !text-green-700",
          error: "!bg-red-50 !border-red-200 !text-red-700",
          warning: "!bg-amber-50 !border-amber-200 !text-amber-700",
          info: "!bg-blue-50 !border-blue-200 !text-blue-700",
        },
      }}
      {...props} />
  );
}

export { Toaster }
