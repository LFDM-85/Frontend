import { Check, Save } from '@mui/icons-material';
import { Box, CircularProgress, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import axios from '../../../../../interceptors/axios';

const EditActions = ({ params, rowId, setRowId }: any) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      axios
        .patch(`/auth/${params.id}`, {
          name: params.row.name,
          isValidated: params.row.isValidated,
          roles: params.row.roles,
        })
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            setRowId(null);
          }
          setLoading(false);
        })
        .catch((error) => console.log('Error', error));
    }, 1500);

    console.log(params);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.row.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default EditActions;
