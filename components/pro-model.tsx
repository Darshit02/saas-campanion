"use client"

import { useProModel } from "@/hooks/use-pro-model"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export const ProModel = () => {
    const proModel = useProModel()
    return (
        <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade to Pro
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}