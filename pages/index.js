import { Fragment } from 'react';
import Head from 'next/head';

import { connectToDataBase } from './api/new-meetup';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetup Destination</title>
        <meta
          name="description"
          content="Checkout our list of wonderful meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = async () => {
//   // fetch data from api//
//   return {
//     props: {
//       meetups: dummyMeetUp // data fetched from the Api
//     }
//   };
// };

export const getStaticProps = async () => {
  // fetch data from api//
  const response = await connectToDataBase();
  const { meetupCollection, client } = response;
  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        id: meetup._id.toString(),
        address: meetup.address
      })) // data fetched from the Api
    },
    revalidate: 1
  };
};

export default HomePage;

// const dummyMeetUp = [
//   {
//     id: 'm1',
//     image:
//       'https://cdn05.allafrica.com/download/pic/main/main/csiid/00581617:8620b2eff950216973c29c4f64ffa2be:arc614x376:w735:us1.jpg',
//     title: 'Grandmas Place',
//     address: 'No 10 Kitchen Avenue',
//     description: 'Wake up to the sunset at your door steps'
//   },
//   {
//     id: 'm2',
//     image:
//       'https://www.wantedinafrica.com/i/preview/storage/uploads/2020/09/Africa_Tourism.jpg',
//     title: 'African Kitchen',
//     address: 'No 13 Jos Avenue',
//     description: 'Stay close to nature'
//   }
// ];
