/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code

// Profile.js

/// Imports and dependencies
import React, { useState } from 'react';
import {
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
  Container,
  FormControl,
  InputLabel,
} from '@mui/material'



/// function for profile
function Profile({jwt}) {

  /// Three useStates for each value (defined in the User Schema in the backend)
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');

  /// Create event
  const handleDisplayNameChange = (event) => setDisplayName(event.target.value);
  const handleBioChange = (event) => setBio(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);


  const handleSave = async () => {
    try {
      //Put request to insert values from Profile Page to User Schema
      const response = await fetch('/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ // Add values to the body.
          displayName,
          bio,
          gender,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        
      } else {
        // Handle error
        console.error('Failed to update profile');
      }
    } catch (error) {
        console.log('Error updating profile');
    }
  };


  /// Returns Displayname Bio and Gender in a Container

  return (
    <Container maxWidth="sm">
      <h2>Edit Profile</h2>
      <form>
        {/* displayName */}
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={displayName}
          onChange={handleDisplayNameChange}
        />

        {/* Bio */}
        <TextareaAutosize
          minRows={3}
          placeholder="Bio"
          style={{ width: '100%', marginTop: 16 }}
          value={bio}
          onChange={handleBioChange}
        />

        {/* Gender */}
        <FormControl fullWidth variant="outlined" style={{ marginTop: 16 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={handleGenderChange} label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Save */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16}}
          onClick={handleSave}
        >
          Save
        </Button>
      </form>
    </Container>
  );
}

export default Profile;