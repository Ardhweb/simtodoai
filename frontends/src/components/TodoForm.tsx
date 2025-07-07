"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import axios from "axios"
import { Category } from "@/types/category"
import { Todo } from "@/types/todo"
type TodoFormProps = {
  onSuccess: () => void;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Please select or create a category"), // category_name string selected from dropdown
  priority_score: z.coerce.number().int().min(0, "Priority is required"),
  status: z.string().min(1, "Please Select Status"),
})

export default function TodoForm({ onSuccess }: TodoFormProps) {
  const [categories, setCategories] = useState<Category[]>([])

  const statusLabels: Record<Todo["status"], string> = {
    "0": "Todo",
    "1": "Pending",
    "2": "Completed",
    "3": "In Progress",
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority_score:1,
      status: "0", // default status "Todo"
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Find category by name to get the ID
    const selectedCategory = categories.find(
      (cat) => cat.category_name === values.category
    )

    if (!selectedCategory) {
      toast.error("Invalid category selected")
      return
    }

    // Prepare payload matching Django model expectations
    const payload = {
      title: values.title,
      description: values.description || "",
      category: selectedCategory.id, // send category ID (number)
      priority_score: values.priority_score, // ✅ convert to number
      status: values.status, // status as string, matches Django choices
      // deadline can be added here if you have it
    }

    axios
      .post("http://127.0.0.1:8000/api/tasks/", payload)
      .then((response) => {
        toast.success("Todo created successfully!")
        console.log("Response:", response.data)
        form.reset()
        onSuccess() // Refresh the List after  POST Success
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            `Failed to create todo: ${JSON.stringify(error.response.data)}`
          )
          console.error("Error response:", error.response.data)
        } else {
          toast.error("Failed to create todo")
          console.error("Error:", error.message)
        }
      })
  }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories/list/")
      .then((res) => {
        const fetchedCats: Category[] = res.data
        setCategories(fetchedCats)
      })
      .catch((err) => {
        console.error("API call failed:", err)
      })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-10">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Enter todo title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional description"
                  className="resize w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category - Select by category_name but send id */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.category_name}>
                      {cat.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status - string values "0", "1", "2", "3" */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || "0"}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

       {/* Priority - send string but convert to number on submit */}
       <FormField
          control={form.control}
          name="priority_score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(Number(value))} // Convert string to number
                  value={String(field.value)} // Convert number to string for RadioGroup
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="option-one" />
                    <Label htmlFor="option-one">
                      {/* Using a visually distinct element for color, for better accessibility, consider using CSS classes */}
                      <span className="w-4 h-4 rounded-full bg-red-500 inline-block mr-1"></span> High
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="option-two" />
                    <Label htmlFor="option-two">
                      {/* Using a visually distinct element for color */}
                      <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block mr-1"></span> Low
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
