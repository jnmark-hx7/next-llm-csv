import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function DialogDropzone() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload Files</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Upload your csv files here and click submit.
          </DialogDescription>
        </DialogHeader>
            <Input id="name" type="file" />
        <DialogFooter >
          <Button type="submit" className="w-full" >Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
