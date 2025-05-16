import { CheckCircle2 } from "lucide-react"

interface OrderStatusStepperProps {
  status: string
}

export function OrderStatusStepper({ status }: OrderStatusStepperProps) {
  const steps = [
    { id: "ordered", label: "注文済み" },
    { id: "paid", label: "支払い済み" },
    { id: "shipped", label: "発送済み" },
    { id: "delivered", label: "配送完了" },
  ]

  const currentStepIndex =
    steps.findIndex((step) => step.id === status) !== -1 ? steps.findIndex((step) => step.id === status) : 0

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`
              flex h-10 w-10 items-center justify-center rounded-full border-2
              ${
                index <= currentStepIndex
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 text-muted-foreground/30"
              }
            `}
            >
              {index < currentStepIndex ? <CheckCircle2 className="h-6 w-6" /> : <span>{index + 1}</span>}
            </div>
            <span
              className={`
              mt-2 text-sm font-medium
              ${index <= currentStepIndex ? "text-foreground" : "text-muted-foreground/50"}
            `}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 relative">
        <div className="absolute top-0 h-1 w-full bg-muted-foreground/20"></div>
        <div
          className="absolute top-0 h-1 bg-primary transition-all"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  )
}
