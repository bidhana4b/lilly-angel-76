import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { AlertTriangle, Edit, MoreHorizontal, PenSquare, Plus, Save, ShieldCheck, Trash, User, Users } from "lucide-react";
import { AdminRole, AdminUser, Permission } from "./types";
import { mockAdminRoles, mockAdminUsers, mockPermissions } from "./mockData";

const AdminRolesPage: React.FC = () => {
  const [roles, setRoles] = useState<AdminRole[]>(mockAdminRoles);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { toast } = useToast();
  
  // Form state
  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });
  
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: ""
  });
  
  const handleCreateRole = () => {
    setSelectedRole(null);
    setRoleForm({
      name: "",
      description: "",
      permissions: []
    });
    setShowRoleDialog(true);
  };
  
  const handleEditRole = (role: AdminRole) => {
    setSelectedRole(role);
    setRoleForm({
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(p => p.id)
    });
    setShowRoleDialog(true);
  };
  
  const handleDeleteRole = (role: AdminRole) => {
    setSelectedRole(role);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteRole = () => {
    if (!selectedRole) return;
    
    setRoles(roles.filter(r => r.id !== selectedRole.id));
    
    toast({
      title: "Role Deleted",
      description: `${selectedRole.name} role has been deleted.`,
      duration: 3000,
    });
    
    setShowDeleteConfirm(false);
  };
  
  const handleCreateUser = () => {
    setSelectedUser(null);
    setUserForm({
      name: "",
      email: "",
      role: ""
    });
    setShowUserDialog(true);
  };
  
  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowUserDialog(true);
  };
  
  const saveRole = () => {
    // Validation
    if (!roleForm.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Role name is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (roleForm.permissions.length === 0) {
      toast({
        title: "Validation Error",
        description: "You must select at least one permission for this role.",
        variant: "destructive",
      });
      return;
    }
    
    // Create or update role
    if (selectedRole) {
      // Update existing role
      const updatedRoles = roles.map(role => 
        role.id === selectedRole.id
          ? {
              ...role,
              name: roleForm.name,
              description: roleForm.description,
              permissions: permissions.filter(p => roleForm.permissions.includes(p.id)),
              lastUpdated: new Date().toISOString()
            }
          : role
      );
      setRoles(updatedRoles);
      
      toast({
        title: "Role Updated",
        description: `${roleForm.name} role has been updated successfully.`,
        duration: 3000,
      });
    } else {
      // Create new role
      const newRole: AdminRole = {
        id: `R${(roles.length + 1).toString().padStart(3, '0')}`,
        name: roleForm.name,
        description: roleForm.description,
        permissions: permissions.filter(p => roleForm.permissions.includes(p.id)),
        createdAt: new Date().toISOString(),
        usersAssigned: 0
      };
      
      setRoles([...roles, newRole]);
      
      toast({
        title: "Role Created",
        description: `${roleForm.name} role has been created successfully.`,
        duration: 3000,
      });
    }
    
    setShowRoleDialog(false);
  };
  
  const saveUser = () => {
    // Validation
    if (!userForm.name.trim()) {
      toast({
        title: "Validation Error",
        description: "User name is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userForm.email.trim() || !userForm.email.includes('@')) {
      toast({
        title: "Validation Error",
        description: "A valid email is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userForm.role) {
      toast({
        title: "Validation Error",
        description: "You must select a role for this user.",
        variant: "destructive",
      });
      return;
    }
    
    // Create or update user
    if (selectedUser) {
      // Update existing user
      const updatedUsers = adminUsers.map(user => 
        user.id === selectedUser.id
          ? {
              ...user,
              name: userForm.name,
              email: userForm.email,
              role: userForm.role
            }
          : user
      );
      setAdminUsers(updatedUsers);
      
      toast({
        title: "User Updated",
        description: `${userForm.name} has been updated successfully.`,
        duration: 3000,
      });
    } else {
      // Create new user
      const newUser: AdminUser = {
        id: `ADMIN-${(adminUsers.length + 1).toString().padStart(3, '0')}`,
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        lastLogin: new Date().toISOString(),
        status: 'active'
      };
      
      setAdminUsers([...adminUsers, newUser]);
      
      toast({
        title: "User Created",
        description: `${userForm.name} has been added as an administrator.`,
        duration: 3000,
      });
    }
    
    setShowUserDialog(false);
  };
  
  const handleTogglePermission = (permissionId: string) => {
    if (roleForm.permissions.includes(permissionId)) {
      setRoleForm({
        ...roleForm,
        permissions: roleForm.permissions.filter(id => id !== permissionId)
      });
    } else {
      setRoleForm({
        ...roleForm,
        permissions: [...roleForm.permissions, permissionId]
      });
    }
  };
  
  // Group permissions by module
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  // Function to toggle user status - modified to use proper types
  const handleToggleUserStatus = (user: AdminUser) => {
    const updatedUsers = adminUsers.map(u => 
      u.id === user.id
        ? { ...u, status: u.status === 'active' ? 'inactive' as const : 'active' as const }
        : u
    );
    
    setAdminUsers(updatedUsers);
    
    toast({
      title: `User ${user.status === 'active' ? 'Deactivated' : 'Activated'}`,
      description: `${user.name} has been ${user.status === 'active' ? 'deactivated' : 'activated'}.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Admin Roles
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Admin Users
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Admin Roles</CardTitle>
                <CardDescription>
                  Manage roles and permissions for system administrators
                </CardDescription>
              </div>
              <Button 
                onClick={handleCreateRole}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add New Role
              </Button>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px] text-center">Assigned Users</TableHead>
                      <TableHead className="w-[180px]">Last Modified</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell className="text-center">{role.usersAssigned}</TableCell>
                        <TableCell>
                          {role.lastUpdated 
                            ? format(new Date(role.lastUpdated), "MMM dd, yyyy")
                            : format(new Date(role.createdAt), "MMM dd, yyyy")
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditRole(role)}
                              className="h-8 w-8 p-0"
                              title="Edit Role"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteRole(role)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              title="Delete Role"
                              disabled={role.usersAssigned > 0}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center p-4 border rounded-md bg-muted/50">
            <AlertTriangle className="h-5 w-5 mr-3 text-yellow-600" />
            <div>
              <span className="text-sm">Roles with assigned users cannot be deleted. Reassign users first, then delete the role.</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Administrator Users</CardTitle>
                <CardDescription>
                  Manage users with administrative access
                </CardDescription>
              </div>
              <Button 
                onClick={handleCreateUser}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add New Admin
              </Button>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(user.lastLogin), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => handleEditUser(user)}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Edit className="h-4 w-4" /> Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleToggleUserStatus(user)}
                              >
                                <User className="h-4 w-4" /> 
                                {user.status === 'active' ? 'Deactivate' : 'Activate'} User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Role Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedRole ? `Edit ${selectedRole.name}` : "Create New Role"}
            </DialogTitle>
            <DialogDescription>
              {selectedRole 
                ? "Modify the role details and permissions" 
                : "Define a new administrator role with specific permissions"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name <span className="text-red-500">*</span></Label>
              <Input 
                id="role-name" 
                value={roleForm.name}
                onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                placeholder="e.g., Content Manager, Reports Admin"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Textarea 
                id="role-description"
                value={roleForm.description}
                onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                placeholder="Describe the purpose and scope of this role"
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-3 pt-4">
              <Label>Permissions <span className="text-red-500">*</span></Label>
              <p className="text-sm text-muted-foreground mb-2">
                Select the permissions this role will have:
              </p>
              
              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                  <div key={module} className="space-y-2">
                    <h4 className="text-sm font-semibold capitalize">{module}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {modulePermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={permission.id}
                            checked={roleForm.permissions.includes(permission.id)}
                            onCheckedChange={() => handleTogglePermission(permission.id)}
                          />
                          <Label 
                            htmlFor={permission.id} 
                            className="text-sm cursor-pointer flex-1"
                          >
                            <span className="font-medium capitalize">
                              {permission.action}
                            </span>
                            <span className="ml-1">{permission.description}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={saveRole}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              {selectedRole ? "Update Role" : "Create Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Admin User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? `Edit ${selectedUser.name}` : "Add Administrator"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser 
                ? "Update administrator information and role" 
                : "Create a new administrator account"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Full Name <span className="text-red-500">*</span></Label>
              <Input 
                id="user-name" 
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="e.g., John Smith"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-email">Email Address <span className="text-red-500">*</span></Label>
              <Input 
                id="user-email"
                type="email" 
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="e.g., john@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-role">Role <span className="text-red-500">*</span></Label>
              <Select 
                value={userForm.role} 
                onValueChange={(value) => setUserForm({ ...userForm, role: value })}
              >
                <SelectTrigger id="user-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={saveUser}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              {selectedUser ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{selectedRole?.name}" role? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRole?.usersAssigned > 0 && (
            <div className="flex items-center p-3 border rounded-md bg-yellow-50 mb-4">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              <div className="text-sm text-yellow-800">
                This role has {selectedRole.usersAssigned} users assigned to it. 
                You must reassign these users before deleting this role.
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDeleteRole}
              disabled={selectedRole?.usersAssigned! > 0}
              className="flex items-center gap-1"
            >
              <Trash className="h-4 w-4" /> Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRolesPage;
