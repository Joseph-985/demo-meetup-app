import { Fragment } from 'react';
import Head from 'next/head';
import { ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

import { connectToDataBase } from '../api/new-meetup';

const MeetUpDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title + ' Details'}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        address={props.meetupData.address}
        image={props.meetupData.image}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const response = await connectToDataBase();

  const { meetupCollection, client } = response;

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray(); // _id:1 means no other field value just the id

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() }
    }))
  };
};

export const getStaticProps = async (context) => {
  //fetch data of single meetup//
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  const response = await connectToDataBase();

  const { meetupCollection, client } = response;

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId)
  });

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.title,
        description: selectedMeetup.description
      }
    }
  };
};

export default MeetUpDetails;
