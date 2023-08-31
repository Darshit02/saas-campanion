"use client";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";

interface CFProps {
  initialData: Companion | null;
  categories: Category[];
}
const formSchema = z.object({
    name:z.string().min(1,{
        message : "Name Is Required"
    }),
    description : z.string().min(1,{
        message: "Description  Is Required"
    }),
    instructions : z.string().min(200,{
        message : "Instruction Required atleast 200 characters"
    }),
    seed : z.string().min(200,{
        message : "Seed Required atleast 200 characters"
    }),
    src : z.string().min(1,{
        message : "Image is required"
    }),
    categoryId : z.string().min(1,{
        message:"Categorty is Required."
    })
})
const CompanionForm = ({ categories, initialData }: CFProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : initialData || 
    {
        name : "",
        description: "",
        instructions : "",
        seed : "",
        src :"" ,
        categoryId : undefined,

    }
  })
  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values : z.infer <typeof formSchema>) => {
    console.log(values);
    
  }
    return <div>CompanionForm</div>;
};

export default CompanionForm;
