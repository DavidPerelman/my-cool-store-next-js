// import User from '@/models/User';
// import NextAuth from 'next-auth';
// import bcrypt from 'bcryptjs';
// import Credentials from 'next-auth/providers/credentials';
// import dbConnect from '@/config/dbConnect';
// import CredentialsProvider from 'next-auth/providers/credentials';

// import NextAuth from 'next-auth';

// const { default: NextAuth } = require('next-auth');
import { verifyPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// export default NextAuth({
//   session: {
//     jwt: true,
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials, req) {
//         dbConnect();
//         console.log(credentials);

//         const { enteredEmail, enteredPassword } = credentials;

//         console.log(enteredEmail);
//         console.log(enteredPassword);
//         const user = await User.findOne({ enteredEmail });

//         if (!user) {
//           throw new Error('Invalid Email');
//         }

//         // const isPasswordMatched = user.comparePassword(
//         //   enteredPassword,
//         //   function (err, isMatch) {
//         //     if (err) throw err;
//         //     console.log('enteredPassword:', isMatch); // -&gt; Password123: true
//         //   }
//         // );

//         // let passwordHash = await bcrypt.hash(user.password, salt);
//         // const booleanResult = await bcrypt.compare(
//         //   enteredPassword,
//         //   passwordHash
//         // );

//         // console.log(booleanResult);

//         const isPasswordMatched = await bcrypt.compare(
//           enteredPassword,
//           user.password
//         );

//         if (!isPasswordMatched) {
//           throw new Error('Invalid Password');
//         }

//         return user;
//       },
//     }),
//   ],
//   //   pages: {
//   //     signIn: '/login',
//   //   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
