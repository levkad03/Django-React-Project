import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyMultiLineField from './forms/MyMultiLineField';
import MySelectField from './forms/MySelectField';
import MyDatePicker from './forms/MyDatePickerField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const myParam = useParams();
  const myId = myParam.id;

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
    });
    AxiosInstance.get(`project/${myId}`).then(res => {
      console.log(res.data);
      setValue('name', res.data.name);
      setValue('comments', res.data.comments);
      setValue('status', res.data.status);
      setValue('projectmanager', res.data.project_manager);
      setValue('start_date', Dayjs(res.data.start_date));
      setValue('end_date', Dayjs(res.data.end_date));
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
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: defaultValues,
  });
  const submission = data => {
    const StartDate = Dayjs(data.start_date['$d']).format('YYYY-MM-DD');
    const EndDate = Dayjs(data.end_date['$d']).format('YYYY-MM-DD');
    AxiosInstance.put(`project/${myId}/`, {
      name: data.name,
      status: data.status,
      project_manager: data.projectmanager,
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

export default Edit;
