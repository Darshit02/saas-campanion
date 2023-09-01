"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "./image-upload";

interface CFProps {
  initialData: Companion | null;
  categories: Category[];
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name Is Required",
  }),
  description: z.string().min(1, {
    message: "Description  Is Required",
  }),
  instructions: z.string().min(200, {
    message: "Instruction Required atleast 200 characters",
  }),
  seed: z.string().min(200, {
    message: "Seed Required atleast 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Categorty is Required.",
  }),
});
const CompanionForm = ({ categories, initialData }: CFProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="h-full p-4 space-y-2 max-w-3 mx-auto">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-18"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General Information of Your Companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center sapce-y-4 ">
                <FormControl>
                    <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
  )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
