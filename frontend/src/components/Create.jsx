import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyMultiLineField from './forms/MyMultiLineField';
import MySelectField from './forms/MySelectField';
import MyDatePicker from './forms/MyDatePickerField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Create = () => {
  const [projectManager, setProjectManager] = useState();
  const [loading, setLoading] = useState(true);
  const hardcodedOptions = [
    { id: '', name: 'None' },
    { id: 'Open', name: 'Open' },
    { id: 'In Progress', name: 'In Progress' },
    { id: 'Completed', name: 'Completed' },
  ];

  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then(res => {
      setProjectManager(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();
  const defaultValues = {
    name: '',
    comments: '',
    status: '',
  };

  const schema = yup.object({
    name: yup.string().required('Name is required field'),
    projectmanager: yup.string().required('Project Manager is required field'),
    status: yup.string().required('Status is required field'),
    comments: yup.string(),
    start_date: yup.date().required('Start date is required field'),
    end_date: yup
      .date()
      .required('End date is required field')
      .min(yup.ref('start_date'), 'End date cannot be before start date'),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const submission = data => {
    const StartDate = Dayjs(data.start_date['$d']).format('YYYY-MM-DD');
    const EndDate = Dayjs(data.end_date['$d']).format('YYYY-MM-DD');
    AxiosInstance.post(`project/`, {
      name: data.name,
      project_manager: data.projectmanager,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then(res => {
      navigate(`/`);
    });
  };
  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              backgroundColor: '#00003f',
              marginBottom: '10px',
            }}
          >
            <Typography sx={{ marginLeft: '20px', color: '#ffffff' }}>
              Create Records
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              boxShadow: 3,
              padding: 4,
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '40px',
              }}
            >
              <MyTextField
                label="Name"
                name="name"
                control={control}
                placeholder="Provide a project name"
                width={'30%'}
              />

              <MyDatePicker
                label="Start Date"
                name="start_date"
                control={control}
                width={'30%'}
              />

              <MyDatePicker
                label="End Date"
                name="end_date"
                control={control}
                width={'30%'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <MyMultiLineField
                label="Comments"
                name="comments"
                control={control}
                placeholder="Provide project comments"
                width={'30%'}
              />

              <MySelectField
                label="Status"
                name="status"
                control={control}
                width={'30%'}
                options={hardcodedOptions}
              />
              <MySelectField
                label="Project Manager"
                name="projectmanager"
                control={control}
                width={'30%'}
                options={projectManager}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                marginTop: '40px',
              }}
            >
              <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Create;
