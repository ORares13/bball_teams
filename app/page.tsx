'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WelcomePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Basketball Teams</h1>
        <p className="text-gray-600 mb-8">
          Manage your Euroleague and Eurocup teams with ease
        </p>



        <div className="flex justify-center gap-6 mt-6">
          <Link
            href="/auth/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
