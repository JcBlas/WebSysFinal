import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
  profileSection: {
    padding: theme.spacing(4),
    textAlign: 'left', // Ensure text is aligned to the left
  },
  mb40: {
    marginBottom: theme.spacing(5),
  },
  whiteText: {
    color: 'white',
  },
  perfumeSection: {
    marginTop: theme.spacing(4),
  },
  perfumeItem: {
    marginBottom: theme.spacing(3),
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className={classes.profileSection}>
        <div className={classes.mb40}>
          <Typography variant="h3" gutterBottom>{data.name}</Typography>
          <Typography variant="h6" gutterBottom className={classes.whiteText}>{data.email}</Typography>
          <Typography variant="body2" gutterBottom className={classes.whiteText}>{data.bio}</Typography>
        </div>
        <Typography variant="h6" gutterBottom className={classes.perfumeSection}>Perfumes</Typography>
        {data.perfume.map((perfume, index) => (
          <div key={index} className={classes.perfumeItem}>
            <Typography variant="h6" gutterBottom className={classes.whiteText}>{perfume.brand}</Typography>
            <Typography variant="body2" gutterBottom className={classes.whiteText}>{perfume.model}</Typography>
          </div>
        ))}
      </Container>
    </Main>
  );
};

export default Home;
