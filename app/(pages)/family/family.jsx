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
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import {
  UserPlus,
  Pencil,
  Trash,
  Phone,
  Envelope,
  IdentificationCard,
  Cake,
  DotsThree,
  Heart,
  House,
  UsersThree,
  MagnifyingGlass,
  FunnelSimple,
  CaretRight,
  Images,
} from "@phosphor-icons/react";

const FamilySection = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [activeTab, setActiveTab] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRelation, setFilterRelation] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    dob: "",
    phone: "",
    email: "",
    aadhar: "",
    address: "",
    profileColor: getRandomColor(),
    notes: "",
  });

  function getRandomColor() {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
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
    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      relation: "",
      dob: "",
      phone: "",
      email: "",
      aadhar: "",
      address: "",
      profileColor: getRandomColor(),
      notes: "",
    });
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

  const relationColors = {
    "Father": "bg-blue-100 text-blue-800",
    "Mother": "bg-pink-100 text-pink-800",
    "Spouse": "bg-purple-100 text-purple-800",
    "Son": "bg-green-100 text-green-800",
    "Daughter": "bg-yellow-100 text-yellow-800",
    "Brother": "bg-indigo-100 text-indigo-800",
    "Sister": "bg-red-100 text-red-800",
    "Grandparent": "bg-amber-100 text-amber-800",
    "Uncle": "bg-cyan-100 text-cyan-800",
    "Aunt": "bg-lime-100 text-lime-800",
    "Cousin": "bg-orange-100 text-orange-800",
    "Nephew": "bg-emerald-100 text-emerald-800",
    "Niece": "bg-rose-100 text-rose-800",
  };

  const getRelationClass = (relation) => {
    return relationColors[relation] || "bg-gray-100 text-gray-800";
  };

  const filteredMembers = familyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.relation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRelation ? member.relation === filterRelation : true;
    return matchesSearch && matchesFilter;
  });

  const uniqueRelations = [...new Set(familyMembers.map(member => member.relation))];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl mb-8 shadow-sm">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Family Directory
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Keep track of your family members' information in one place. Add, edit,
          and organize your family contacts easily.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <MagnifyingGlass className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search members..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterRelation} onValueChange={setFilterRelation}>
            <SelectTrigger className="w-full md:w-40">
              <div className="flex items-center gap-2">
                <FunnelSimple className="h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Relations</SelectItem>
              {uniqueRelations.map(relation => (
                <SelectItem key={relation} value={relation}>{relation}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between w-full">
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-1">
                  <Images className="h-4 w-4" />
                  <span>Grid</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-1">
                  <UsersThree className="h-4 w-4" />
                  <span>List</span>
                </TabsTrigger>
              </TabsList>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <UserPlus className="mr-2 h-5 w-5" /> Add Family Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {editingMember !== null ? "Edit Family Member" : "Add New Family Member"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relation">Relation</Label>
                        <Select
                          name="relation"
                          value={formData.relation}
                          onValueChange={(value) => handleSelectChange("relation", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Father">Father</SelectItem>
                            <SelectItem value="Mother">Mother</SelectItem>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Son">Son</SelectItem>
                            <SelectItem value="Daughter">Daughter</SelectItem>
                            <SelectItem value="Brother">Brother</SelectItem>
                            <SelectItem value="Sister">Sister</SelectItem>
                            <SelectItem value="Grandparent">Grandparent</SelectItem>
                            <SelectItem value="Uncle">Uncle</SelectItem>
                            <SelectItem value="Aunt">Aunt</SelectItem>
                            <SelectItem value="Cousin">Cousin</SelectItem>
                            <SelectItem value="Nephew">Nephew</SelectItem>
                            <SelectItem value="Niece">Niece</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                          className="border-gray-300"
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
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aadhar">Aadhar Number</Label>
                        <Input
                          id="aadhar"
                          name="aadhar"
                          value={formData.aadhar}
                          onChange={handleInputChange}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Input
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="border-gray-300"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        {editingMember !== null ? "Update Member" : "Add Member"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Tabs Content */}
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member, index) => (
                  <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                    <CardHeader className="relative pb-0 pt-8">
                      <div className="absolute top-0 right-0 p-4">
                        <TooltipProvider>
                          <div className="flex space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(index)}
                                  className="h-8 w-8"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Member</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete {member.name}'s information.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(index)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TooltipTrigger>
                              <TooltipContent>Delete Member</TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </div>
                      <CardTitle className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 ring-2 ring-offset-2 ring-offset-background">
                          <AvatarFallback className={`${member.profileColor} text-white text-xl`}>
                            {member.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xl font-semibold">{member.name}</div>
                          <Badge className={`${getRelationClass(member.relation)} mt-1 font-medium`}>
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
                        <div className="space-y-3">
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
                          {member.address && (
                            <div className="flex items-center gap-3">
                              <House className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm">{member.address}</span>
                            </div>
                          )}
                          {member.notes && (
                            <div className="flex items-center gap-3">
                              <Heart className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm italic text-muted-foreground">
                                {member.notes}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 border-t text-xs text-muted-foreground flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <DotsThree className="h-4 w-4" />
                        Member #{index + 1}
                      </span>
                      <CaretRight className="h-4 w-4" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="divide-y divide-border">
                      {filteredMembers.map((member, index) => (
                        <div key={index} className="flex items-center p-4 hover:bg-muted/50 transition-colors">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarFallback className={`${member.profileColor} text-white`}>
                              {member.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{member.name}</span>
                              <Badge className={`${getRelationClass(member.relation)} text-xs`}>
                                {member.relation}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {member.phone}
                              {member.email && (
                                <span className="flex items-center gap-2 ml-4">
                                  <Envelope className="h-4 w-4" />
                                  {member.email}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(index)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete {member.name}'s information.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(index)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {filteredMembers.length === 0 && (
        <Card className="mt-8 border-dashed">
          <CardContent className="text-center py-12">
            <UsersThree className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No Family Members Found</h3>
            <p className="text-muted-foreground mt-2">
              {familyMembers.length === 0
                ? "Add your first family member to get started!"
                : "No members match your search or filter criteria."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FamilySection;