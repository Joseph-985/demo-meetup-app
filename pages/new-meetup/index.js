import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();
  const getNewMeetup = async (meetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    console.log(data);
    router.push('/');
  };
  return (
    <Fragment>
      <Head>
        <title>Add new meetups</title>
        <meta
          name="description"
          content="Add your own meetup and create a networking opportunity "
        />
      </Head>
      <NewMeetupForm onAddMeetup={getNewMeetup} />
    </Fragment>
  );
};

export default NewMeetupPage;
