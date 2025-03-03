import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
function PlaceholderDocument() {
  return (
 <Button>
     <PlusCircleIcon className="h-16 w-16 " />
    <p>Add a document</p>
 </Button>  )
}

export default PlaceholderDocument