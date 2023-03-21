import ProfileForm from '@/components/Auth/ProfileForm/ProfileForm';
import { getSession } from 'next-auth/react';

function ProfilePage(props) {
  const { data } = props;
  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  }

  return (
    <>
      <h1>Hello, {data.user.userName}!</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  let data;

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    const response = await fetch('http://localhost:3000/api/user/user-data', {
      method: 'POST',
      body: JSON.stringify({ email: session.user.email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    data = await response.json();
  }

  return {
    props: { data },
  };
}

export default ProfilePage;
