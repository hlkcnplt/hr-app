"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  resume: z.string().min(2, {
    message: "",
  }),
  terms: z.string().min(2, {
    message: "",
  })
})


export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      surname: "",
      resume: "",
      terms: "",
    },
  })

 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="container h-screen min-w-full flex items-center justify-center bg-zinc-900">
      <div className="w-2/5 flex flex-col  items-start content-center self-center place-content-center gap-8 bg-white p-12 rounded">
        <div className="flex flex-col gap-1">
          <div className="font-bold text-lg">Example Company</div>
          <div className="font-light text-sm">Send your file to HR Department</div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-full space-y-6 flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full max-w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="w-full max-w-full">
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="resume"
              render={({}) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <div className="w-full max-w-full items-center">
                      <Input id="picture" type="file" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({}) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Terms and Conditions</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-end justify-end"><Button type="submit">Submit</Button></div>
          </form>
        </Form>

        
      </div>
    </div>
  );
}
