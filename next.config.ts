import type { NextConfig } from "next";
import Dotenv from "dotenv-webpack"

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  // env:{
  //   REACTLOGIN : "logindata",
  //   MYSPACEID: process.env.MYSPACEID,
  // },
  images:{
    domains:["lh3.googleusercontent.com","firebasestorage.googleapis.com","res.cloudinary.com","cloudinary.com"]
  },

};

export default nextConfig;
