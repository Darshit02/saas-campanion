import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/CompanionForm";

interface CPProps {
  params: {
    companionId : string;
  }
}

const CompanionIdPage = async ({
  params 
} : CPProps) => {
  // TODO : Check Suscription

  const companion = await prismadb.companion.findUnique({
    where : {
      id:params.companionId
    }
  });
  const categories = await prismadb.category.findMany()
  return (
   <CompanionForm
    initialData = {companion}
    categories = {categories}
   />
  )
}

export default CompanionIdPage