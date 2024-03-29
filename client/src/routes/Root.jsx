import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { PencilIcon, Plus, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export async function loader() {
  const res = await axios("http://localhost:8080/users/");
  return { users: res.data.users, res };
}

export default function RootPage() {
  const { users } = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/users/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error: ", error.message);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Card className="bg-white max-w-3xl mx-auto">
        <CardHeader className="border-b">
          <div>
            <Button asChild>
              <Link to={"/create"}>
                <Plus className="mr-2" size={14} /> Add User
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        className="mr-2"
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link to={`/${user.id}/edit`}>
                          <PencilIcon size={14} />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => deleteUser(user.id)}
                        variant="ghost"
                        size="sm"
                        disabled={loading}
                      >
                        <TrashIcon className="pointer-events-none" size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center" colSpan={3}>
                    Users not found 😟
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
