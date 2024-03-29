import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  const res = await axios.get(`http://localhost:8080/users/${params.id}`);
  return { user: res.data.user, res };
}

export default function EditPage() {
  const { user } = useLoaderData();
  console.log(user);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:8080/users/${user.id}`, data);
      navigate("/");
    } catch (error) {
      console.error("Error: ", error.message);
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Card className="max-w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>Update user information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <CardContent className="space-y-6">
            <div className="w-full max-w-sm grid items-center gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                type="text"
                id="name"
                {...register("name", { required: "Full name is required" })}
              />
              {errors.name?.message ? (
                <span className="text-sm text-red-600">
                  {errors.name?.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="w-full max-w-sm grid items-center gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="text"
                id="email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email?.message ? (
                <span className="text-sm text-red-600">
                  {errors.email?.message}
                </span>
              ) : (
                ""
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="ghost" type="reset">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-6 flex items-center justify-center">
        <Link className="text-sm underline hover:no-underline" to={`/`}>
          Back
        </Link>
      </div>
    </Layout>
  );
}
