import ProfileForm from '@/components/Auth/ProfileForm/ProfileForm';
import { getSession, useSession } from 'next-auth/react';

function ProfilePage(props) {
  const { data } = props;
  const { data: session, status } = useSession();

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
      <h1>Hello, {session.user.name}!</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
