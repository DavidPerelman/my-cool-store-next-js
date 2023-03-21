import User from '@/models/User';
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from '@/config/dbConnect';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();
        console.log(credentials);

        const { enteredEmail, enteredPassword } = credentials;

        console.log(enteredEmail);
        console.log(enteredPassword);
        const user = await User.findOne({ enteredEmail });

        if (!user) {
          throw new Error('Invalid Email');
        }

        // const isPasswordMatched = user.comparePassword(
        //   enteredPassword,
        //   function (err, isMatch) {
        //     if (err) throw err;
        //     console.log('enteredPassword:', isMatch); // -&gt; Password123: true
        //   }
        // );

        // let passwordHash = await bcrypt.hash(user.password, salt);
        // const booleanResult = await bcrypt.compare(
        //   enteredPassword,
        //   passwordHash
        // );

        // console.log(booleanResult);

        const isPasswordMatched = await bcrypt.compare(
          enteredPassword,
          user.password
        );

        if (!isPasswordMatched) {
          throw new Error('Invalid Password');
        }

        return user;
      },
    }),
  ],
  //   pages: {
  //     signIn: '/login',
  //   },
  secret: process.env.NEXTAUTH_SECRET,
});
