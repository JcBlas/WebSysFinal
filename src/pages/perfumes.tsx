"use client";

import React from 'react';
import { Container, Typography, TextField, Button, IconButton } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import DeleteIcon from '@material-ui/icons/Delete';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Perfume {
  brand: string;
  model: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  perfume: Perfume[];
}

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='w-1/2 justify-start'>
        <Typography variant="h4">Perfumes</Typography>
        <Formik
          initialValues={{ perfumes: data.perfume }}
          onSubmit={(values, actions) => {
            axios.put('/api/user', { ...data, perfume: values.perfumes })
              .then(res => {
                mutate('/api/user', { ...data, perfume: values.perfumes }, false);
                console.log('Perfumes updated successfully');
              })
              .catch(err => {
                console.error('Error updating perfumes:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <FieldArray name="perfumes">
                {({ push, remove }) => (
                  <div>
                    {values.perfumes.map((perfume, index) => (
                      <div key={index} style={{ marginBottom: '1rem' }}>
                        <Field
                          name={`perfumes.${index}.brand`}
                          as={TextField}
                          label="Brand"
                          InputProps={{ style: { color: 'white' } }}
                          InputLabelProps={{ style: { color: 'darkgray' } }}
                          style={{ color: 'white', marginRight: '1rem' }}
                        />
                        <Field
                          name={`perfumes.${index}.model`}
                          as={TextField}
                          label="Model"
                          InputProps={{ style: { color: 'white' } }}
                          InputLabelProps={{ style: { color: 'darkgray' } }}
                          style={{ color: 'white', marginRight: '1rem' }}
                        />
                        <IconButton
                          onClick={() => remove(index)}
                          aria-label="delete"
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => push({ brand: '', model: '' })}
                    >
                      Add Perfume
                    </Button>
                  </div>
                )}
              </FieldArray><br /><br />
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Main>
  );
}

export default ProfilePage;
