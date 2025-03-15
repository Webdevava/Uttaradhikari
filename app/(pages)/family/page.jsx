// components/FamilySection.jsx
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  UserPlus,
  Pencil,
  Trash,
  Phone,
  Envelope,
  IdentificationCard,
  Cake,
  DotsThree,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const FamilySection = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    dob: "",
    phone: "",
    email: "",
    aadhar: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember !== null) {
      const updatedMembers = familyMembers.map((member, index) =>
        index === editingMember ? formData : member
      );
      setFamilyMembers(updatedMembers);
      setEditingMember(null);
    } else {
      setFamilyMembers([...familyMembers, formData]);
    }
    setFormData({
      name: "",
      relation: "",
      dob: "",
      phone: "",
      email: "",
      aadhar: "",
    });
    setIsOpen(false);
  };

  const handleEdit = (index) => {
    setEditingMember(index);
    setFormData(familyMembers[index]);
    setIsOpen(true);
  };

  const handleDelete = (index) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Family Directory</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="lg">
              <UserPlus className="mr-2 h-5 w-5" /> Add Family Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingMember !== null ? "Edit Member" : "New Family Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relation">Relation</Label>
                  <Input
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingMember !== null ? "Update Member" : "Add Member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="relative pb-0">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div>{member.name}</div>
                  <Badge variant="secondary" className="mt-1">
                    {member.relation}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Cake className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">
                      {new Date(member.dob).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Age: {calculateAge(member.dob)}
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                {member.email && (
                  <div className="flex items-center gap-3">
                    <Envelope className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm break-all">{member.email}</span>
                  </div>
                )}
                {member.aadhar && (
                  <div className="flex items-center gap-3">
                    <IdentificationCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{member.aadhar}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <DotsThree className="h-4 w-4" />
                Member #{index + 1}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {familyMembers.length === 0 && (
        <Card className="mt-8">
          <CardContent className="text-center py-12">
            <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No Family Members Yet</p>
            <p className="text-muted-foreground mt-2">
              Click "Add Family Member" to get started
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FamilySection;