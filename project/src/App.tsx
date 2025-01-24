import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ScanFace } from 'lucide-react';
import { SnackbarProvider, useSnackbar } from 'notistack';

// Types
interface Employee {
  id: string;
  user_first_name: string;
  user_email: string;
  user_phone_number: string;
  role_id: string;
}

interface Role {
  id: string;
  role_name: string;
}

// Dummy data
const dummyEmployees: Employee[] = [
  {
    id: "1",
    user_first_name: "John Doe",
    user_email: "john@example.com",
    user_phone_number: "1234567890",
    role_id: "1"
  },
  {
    id: "2",
    user_first_name: "Jane Smith",
    user_email: "jane@example.com",
    user_phone_number: "9876543210",
    role_id: "2"
  },
  {
    id: "3",
    user_first_name: "Mike Johnson",
    user_email: "mike@example.com",
    user_phone_number: "5555555555",
    role_id: "1"
  }
];

const dummyRoles: Role[] = [
  { id: "1", role_name: "Manager" },
  { id: "2", role_name: "Employee" },
  { id: "3", role_name: "Admin" }
];

const EmployeeSettings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [employees] = useState<Employee[]>(dummyEmployees);
  const [roles] = useState<Role[]>(dummyRoles);
  const [open, setOpen] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newRoleId, setNewRoleId] = useState('');
  const [scanningId, setScanningId] = useState<string | null>(null);

  // Handle role change
  const handleRoleChange = async (employeeId: string, roleId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      enqueueSnackbar('Employee role updated', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to update employee role', { variant: 'error' });
    }
  };

  // Handle form submit for adding new employee
  const handleAddEmployee = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      enqueueSnackbar('Employee added successfully', { variant: 'success' });
      setOpen(false);
      setNewPhoneNumber('');
      setNewRoleId('');
    } catch (error) {
      enqueueSnackbar('Failed to add employee', { variant: 'error' });
    }
  };

  // Handle facial recognition attendance
  const handleMarkAttendance = async (employeeId: string) => {
    setScanningId(employeeId);
    try {
      // Simulate facial recognition scan
      await new Promise(resolve => setTimeout(resolve, 2000));
      enqueueSnackbar('Attendance marked successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to mark attendance', { variant: 'error' });
    } finally {
      setScanningId(null);
    }
  };

  return (
    <Box sx={{ width: isMobile ? '79.5vw' : 'auto' }}>
      <Box
        component={Stack}
        alignItems={'flex-start'}
        direction={'row'}
        justifyContent={'space-between'}
      >
        <Box pb={2}>
          <Typography variant='body1' color='initial'>
            Employee Settings
          </Typography>
          <Typography variant='body2' color='grey'>
            Update employee roles and information here
          </Typography>
        </Box>
        <Button
          variant='outlined'
          sx={{
            fontWeight: 'bold',
            width: isMobile ? '5px' : 'auto',
          }}
          onClick={() => setOpen(true)}
        >
          + Add Employee
        </Button>
      </Box>

      {/* Add Employee Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <Stack spacing={3} pt={1}>
            {/* Phone number input */}
            <TextField
              label='Phone Number'
              variant='outlined'
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              fullWidth
              inputProps={{ maxLength: 10 }}
              placeholder='Enter 10 digit phone number'
            />
            {/* Role selection dropdown */}
            <FormControl fullWidth variant='outlined'>
              <InputLabel id='role-select-label'>Role</InputLabel>
              <Select
                labelId='role-select-label'
                value={newRoleId}
                onChange={(e) => setNewRoleId(e.target.value)}
                input={<OutlinedInput label='Role' />}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddEmployee} variant='contained' color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Employee Table */}
      <TableContainer component={Paper} variant='outlined'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.user_first_name}</TableCell>
                <TableCell>{employee.user_email}</TableCell>
                <TableCell>{employee.user_phone_number}</TableCell>
                <TableCell>
                  <FormControl sx={{ width: 200 }}>
                    <Select
                      value={employee.role_id}
                      size='small'
                      onChange={(e) =>
                        handleRoleChange(employee.id, e.target.value as string)
                      }
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        return (
                          roles.find(
                            (role) => role.id === selected
                          )?.role_name || 'Select role'
                        );
                      }}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.role_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Tooltip title='Mark Attendance'>
                    <IconButton
                      onClick={() => handleMarkAttendance(employee.id)}
                      disabled={scanningId === employee.id}
                    >
                      {scanningId === employee.id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <ScanFace color={theme.palette.info.main} />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Wrap the app with SnackbarProvider
function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <EmployeeSettings />
    </SnackbarProvider>
  );
}

export default App;