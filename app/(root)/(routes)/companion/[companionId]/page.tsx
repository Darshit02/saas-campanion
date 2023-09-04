import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/CompanionForm";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CPProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CPProps) => {
  const { userId } = auth();
  // TODO : Check Suscription
  if (!userId) {
    return redirectToSignIn();
  }
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId
    },
  });
  const categories = await prismadb.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
